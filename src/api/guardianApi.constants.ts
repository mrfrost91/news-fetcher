import { SEARCH_PARAM_KEYS } from 'api/baseNewsApi.constants';

export const BASE_URL = import.meta.env.VITE_GUARDIAN_BASE_URL;
const API_KEY_VALUE = import.meta.env.VITE_GUARDIAN_API_KEY;
export const GUARDIAN_API_SLUG = 'the-guardian';
export const IMMUTABLE_SEARCH_PARAMS = {
  'api-key': API_KEY_VALUE,
  'show-fields': 'thumbnail,trailText',
} as const;
export const SEARCH_PARAMS_MAP = [
  [SEARCH_PARAM_KEYS.from, 'from-date'],
  [SEARCH_PARAM_KEYS.to, 'to-date'],
  [SEARCH_PARAM_KEYS.sortBy, 'order-by'],
  [SEARCH_PARAM_KEYS.pageSize, 'page-size'],
] as const;
