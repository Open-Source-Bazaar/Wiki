import 'core-js/full/array/from-async';

import { Content, Tree } from 'mobx-github';
import { DataObject } from 'mobx-restful';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Minute, Second } from 'web-utility';
import { parse } from 'yaml';

import { CI } from '../../models/configuration';
import { XContent } from '../../models/Wiki';

export const skipBuilding =
  <Props extends DataObject, Params extends ParsedUrlQuery = ParsedUrlQuery>(
    rawHandler: GetStaticProps<Props, Params>,
    revalidate = Minute / Second,
  ): GetStaticProps<Props, Params> =>
  async context => {
    const fallback: GetStaticPropsResult<any> = { notFound: true, revalidate };

    if (CI) return fallback;

    try {
      return await rawHandler(context);
    } catch (error) {
      console.error(error);

      return fallback;
    }
  };

export interface ArticleMeta {
  name: string;
  path?: string;
  meta?: DataObject;
  subs: ArticleMeta[];
}

export const MD_pattern = /\.(md|markdown)$/i,
  MDX_pattern = /\.mdx?$/i;

export function splitFrontMatter(raw: string) {
  const [, frontMatter, markdown] =
    raw.trim().match(/^---[\r\n]([\s\S]+?[\r\n])---[\r\n]([\s\S]*)/) || [];

  if (!frontMatter) return { markdown: raw };

  try {
    const meta = parse(frontMatter) as DataObject;

    return { markdown, meta };
  } catch (error) {
    console.error(`Error parsing Front Matter:`, error);

    return { markdown };
  }
}

export async function* pageListOf(
  path: string,
  prefix = 'pages',
): AsyncGenerator<ArticleMeta> {
  const { readdir, readFile } = await import('fs/promises');

  const list = await readdir(prefix + path, { withFileTypes: true });

  for (const node of list) {
    // eslint-disable-next-line prefer-const
    let { name, parentPath } = node;

    if (name.startsWith('.')) continue;

    const isMDX = MDX_pattern.test(name);

    name = name.replace(MDX_pattern, '');
    const path = `${parentPath}/${name}`.replace(new RegExp(`^${prefix}`), '');

    if (node.isFile() && isMDX) {
      const article: ArticleMeta = { name, path, subs: [] };

      const file = await readFile(`${parentPath}/${node.name}`, 'utf-8');

      const { meta } = splitFrontMatter(file);

      if (meta) article.meta = meta;

      yield article;
    }
    if (!node.isDirectory()) continue;

    const subs = await Array.fromAsync(pageListOf(path, prefix));

    if (subs[0]) yield { name, subs };
  }
}

export type TreeNode<K extends string> = {
  [key in K]: TreeNode<K>[];
};

export function* traverseTree<K extends string, N extends TreeNode<K>>(
  tree: N,
  key: K,
): Generator<N> {
  for (const node of tree[key] || []) {
    yield node as N;
    yield* traverseTree(node as N, key);
  }
}

export const treeToContents = (nodes: Tree[]) =>
  nodes
    .filter(({ path }) => !!path)
    .map(node => {
      const path = node.path!;
      const slashIndex = path.lastIndexOf('/');
      const name = slashIndex >= 0 ? path.slice(slashIndex + 1) : path,
        parent_path = slashIndex >= 0 ? path.slice(0, slashIndex) : '';

      return {
        ...node,
        type: node.type === 'tree' ? 'dir' : 'file',
        path,
        parent_path,
        name,
      } as XContent;
    });

export const filterMarkdownFiles = (nodes: Content[]) =>
  nodes
    .filter(
      ({ path, type, name }) =>
        !path.startsWith('.') &&
        !name.startsWith('.') &&
        (type !== 'file' || MD_pattern.test(name)),
    )
    .map(({ content, ...rest }) => {
      const { meta, markdown } = content ? splitFrontMatter(content) : {};

      return { ...rest, content: markdown, meta };
    });
