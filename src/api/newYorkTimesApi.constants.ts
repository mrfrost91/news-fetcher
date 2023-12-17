import { NONE_LABEL } from 'components/common/fields/Select';
import { SEARCH_PARAM_KEYS } from './baseNewsApi.constants';

export const BASE_URL = import.meta.env.VITE_NY_TIMES_BASE_URL;
export const BASE_IMG_URL = 'https://www.nytimes.com/';
const API_KEY_VALUE = import.meta.env.VITE_NY_TIMES_API_KEY;
export const NY_TIMES_API_SLUG = 'the-new-york-times';
export const IMMUTABLE_SEARCH_PARAMS = {
  'api-key': API_KEY_VALUE,
};
export const INITIAL_SEARCH_PARAMS = {
  [SEARCH_PARAM_KEYS.page]: '1',
};
export const SEARCH_PARAMS_MAP = [
  ['from', 'begin_date'],
  ['to', 'end_date'],
  ['sortBy', 'sort'],
  ['pageSize', ''],
] as const;
export const NY_TIMES_ROWS_RER_PAGE_OPTIONS = [10] as const;

export const SORT_BY_OPTIONS = [
  { label: NONE_LABEL, value: '' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Relevance', value: 'relevance' },
] as const;
