import { Icon } from 'idea-react';
import { Block, renderBlocks, WikiNode } from 'mobx-lark';
import { GetStaticPaths } from 'next';
import { FC } from 'react';
import { Button, Container } from 'react-bootstrap';

import { PageHead } from '../../../components/Layout/PageHead';
import { documentStore } from '../../../models/Wiki';
import { wikiStore } from '../../../models/Wiki';
import { lark } from '../../api/Lark/core';
import { skipBuilding } from '../../api/SSG';

export const getStaticPaths: GetStaticPaths = async () => {
  await lark.getAccessToken();

  const nodes = await wikiStore.getAll();

  return {
    paths: nodes.map(({ node_token }) => ({ params: { node_token } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = skipBuilding(async ({ params }) => {
  await lark.getAccessToken();

  const node = await wikiStore.getOne(params!.node_token as string);

  if (node?.obj_type !== 'docx') return { notFound: true };

  const blocks = await documentStore.getOneBlocks(
    node.obj_token,
    token => `/api/Lark/file/${token}/placeholder`,
  );

  return { props: { node, blocks } };
});

interface WikiDocumentPageProps {
  node: WikiNode;
  blocks: Block<any, any, any>[];
}

const WikiDocumentPage: FC<WikiDocumentPageProps> = ({ node, blocks }) => (
  <Container>
    <PageHead title={node.title} />

    <aside className="text-end">
      <Button
        variant="outline-primary"
        size="sm"
        href={`/wiki/${node.node_token}/debugger`}
      >
        <Icon name="tools" />
      </Button>
    </aside>

    {renderBlocks(blocks)}
  </Container>
);

export default WikiDocumentPage;
