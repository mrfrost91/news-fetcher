import { NONE_LABEL } from 'constants';
import {
  BASE_ROWS_RER_PAGE_OPTIONS,
  INITIAL_PAGE,
  SEARCH_PARAM_KEYS,
} from 'api/baseNewsApi.constants';

export const BASE_URL = import.meta.env.VITE_NEWSAPI_BASE_URL;
const API_KEY_VALUE = import.meta.env.VITE_NEWSAPI_API_KEY;
export const NEWS_API_SLUG = 'news-api';
const LANGUAGE = document.documentElement.lang ?? 'en';
export const IMMUTABLE_SEARCH_PARAMS = {
  apiKey: API_KEY_VALUE,
  language: LANGUAGE,
} as const;

const SORT_BY_SLUGS = {
  relevancy: 'relevancy',
  popularity: 'popularity',
  publishedAt: 'publishedAt',
} as const;

export const SORT_BY_OPTIONS = [
  { label: NONE_LABEL, value: '' },
  { label: 'Relevancy', value: SORT_BY_SLUGS.relevancy },
  { label: 'Popularity', value: SORT_BY_SLUGS.popularity },
  { label: 'Published At', value: SORT_BY_SLUGS.publishedAt },
] as const;

export const INITIAL_SEARCH_PARAMS = {
  [SEARCH_PARAM_KEYS.page]: INITIAL_PAGE,
  [SEARCH_PARAM_KEYS.pageSize]: `${BASE_ROWS_RER_PAGE_OPTIONS[0]}`,
} as const;
