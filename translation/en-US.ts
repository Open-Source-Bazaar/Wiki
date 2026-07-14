import { IDType } from 'mobx-restful';

export default {
  welcome_to: 'Welcome to',
  get_started_by_editing: 'Get started by editing',
  upstream_projects: 'Upstream projects',
  home_page: 'Home Page',
  source_code: 'Source Code',
  pagination: 'Pagination',
  powered_by: 'Powered by',
  documentation: 'Documentation',
  documentation_summary:
    'Find in-depth information about Next.js features and API.',
  learn: 'Learn',
  learn_summary: 'Learn about Next.js in an interactive course with quizzes!',
  examples: 'Examples',
  examples_summary: 'Discover and deploy boilerplate example Next.js projects.',
  deploy: 'Deploy',
  deploy_summary:
    'Instantly deploy your Next.js site to a public URL with Vercel.',

  // Pagination Table
  create: 'Create',
  view: 'View',
  submit: 'Submit',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `Total ${totalCount} rows`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `Are you sure to delete ${keys.join(', ')}?`,
  repository_name: 'Repository Name',
  programming_language: 'Programming Language',
  topic: 'Topic',
  star_count: 'Star Count',
  description: 'Description',

  // Scroll List
  scroll_list: 'Scroll List',
  load_more: 'Load more...',
  no_more: 'No more',

  // Search
  keywords: 'Keywords',
  search_results: 'Search Results',

  // MDX Article
  article: 'Article',
  wiki: 'Wiki',
  debugger: 'Debugger',
  block_diff: 'Block Diff',
  document: 'Document',

  // Wiki
  knowledge_base: 'Knowledge Base',
  contribute_content: 'Contribute Content',
  no_docs_available: 'No documents available in the knowledge base.',
  docs_auto_load_from_github:
    'Documents will be automatically loaded from a GitHub repository.',
  policy: 'Policy',
  creation_date: 'Creation Date',
  publication_date: 'Publication Date',
  edit_on_github: 'Edit on GitHub',
  view_original: 'View Original',
  github_document_description:
    'This is a document page based on a GitHub repository.',
  view_or_edit_on_github: 'View or edit this content on GitHub',

  // Recipe
  recipe: 'Recipe',
  servings: 'Servings',
  preparation_time: 'Preparation time',
} as const;
