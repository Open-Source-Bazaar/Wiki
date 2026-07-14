import { IDType } from 'mobx-restful';

export default {
  welcome_to: '歡迎使用',
  get_started_by_editing: '開始你的專案吧，編輯',
  upstream_projects: '上游專案',
  home_page: '主頁',
  source_code: '源代碼',
  pagination: '分頁',
  powered_by: '強力驅動自',
  documentation: '文檔',
  documentation_summary: '查找有關 Next.js 功能和 API 的深入資訊。',
  learn: '學習',
  learn_summary: '在帶有測驗的交互式課程中了解 Next.js！',
  examples: '示例',
  examples_summary: '發現和部署示例 Next.js 專案。',
  deploy: '部署',
  deploy_summary: '使用 Vercel 立即將您的 Next.js 站點部署到公共 URL。',

  // Pagination Table
  create: '新增',
  view: '查看',
  submit: '提交',
  cancel: '取消',
  edit: '編輯',
  delete: '刪除',
  total_x_rows: ({ totalCount }: { totalCount: number }) =>
    `共 ${totalCount} 行`,
  sure_to_delete_x: ({ keys }: { keys: IDType[] }) =>
    `您確定刪除 ${keys.join('、')} 嗎？`,
  repository_name: '倉庫名',
  programming_language: '編程語言',
  topic: '話題',
  star_count: '星標數',
  description: '描述',

  // Scroll List
  scroll_list: '滾動列表',
  load_more: '加載更多……',
  no_more: '沒有更多',

  // Search
  keywords: '關鍵詞',
  search_results: '搜尋結果',

  // MDX Article
  article: '文章',
  wiki: '知識庫',
  debugger: '偵錯器',
  block_diff: '區塊差異',
  document: '文件',

  // Wiki
  knowledge_base: '知識庫',
  contribute_content: '貢獻內容',
  no_docs_available: '知識庫暫無文檔。',
  docs_auto_load_from_github: '文檔將從 GitHub 存儲庫中自動加載。',
  policy: '政策',
  creation_date: '成文日期',
  publication_date: '發佈日期',
  edit_on_github: '在 GitHub 編輯',
  view_original: '查看原文',
  github_document_description: '這是一個基於 GitHub 存儲庫的文檔頁面。',
  view_or_edit_on_github: '在 GitHub 上查看或編輯此內容',

  // Recipe
  recipe: '菜譜',
  servings: '份數',
  preparation_time: '準備時間',
} as const;
