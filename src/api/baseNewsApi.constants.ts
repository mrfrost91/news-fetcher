export const SEARCH_PARAM_KEYS = {
  page: 'page',
  pageSize: 'pageSize',
  query: 'q',
  from: 'from',
  to: 'to',
  sortBy: 'sortBy',
} as const;

export const BASE_ROWS_RER_PAGE_OPTIONS = [10, 25, 50, 100];
export const INITIAL_SEARCH_PARAMS = {
  [SEARCH_PARAM_KEYS.page]: '1',
  [SEARCH_PARAM_KEYS.pageSize]: `${BASE_ROWS_RER_PAGE_OPTIONS[0]}`,
} as const;
