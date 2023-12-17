import { NONE_LABEL } from 'components/common/fields/Select';

export const BASE_URL = import.meta.env.VITE_NEWSAPI_BASE_URL;
const API_KEY_VALUE = import.meta.env.VITE_NEWSAPI_API_KEY;
export const NEWS_API_SLUG = 'news-api';
const LANGUAGE = document.documentElement.lang ?? 'en';
export const IMMUTABLE_SEARCH_PARAMS = {
  apiKey: API_KEY_VALUE,
  language: LANGUAGE,
} as const;

export const SORT_BY_OPTIONS = [
  { label: NONE_LABEL, value: '' },
  { label: 'Relevancy', value: 'relevancy' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Published At', value: 'publishedAt' },
] as const;
