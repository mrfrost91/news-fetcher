import { NONE_LABEL } from 'constants';

export const SEARCH_PARAM_KEYS = {
  page: 'page',
  pageSize: 'pageSize',
  query: 'q',
  from: 'from',
  to: 'to',
  sortBy: 'sortBy',
} as const;

export const SORT_BY_SLUGS = {
  newest: 'newest',
  oldest: 'oldest',
  relevance: 'relevance',
} as const;

export const BASE_SORT_BY_OPTIONS = [
  { label: NONE_LABEL, value: '' },
  { label: 'Newest', value: SORT_BY_SLUGS.newest },
  { label: 'Oldest', value: SORT_BY_SLUGS.oldest },
  { label: 'Relevance', value: SORT_BY_SLUGS.relevance },
] as const;

export const BASE_ROWS_RER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

export const INITIAL_PAGE = '1';
export const BASE_INITIAL_SEARCH_PARAMS = {
  [SEARCH_PARAM_KEYS.page]: INITIAL_PAGE,
  [SEARCH_PARAM_KEYS.pageSize]: `${BASE_ROWS_RER_PAGE_OPTIONS[0]}`,
} as const;
