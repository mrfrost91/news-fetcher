import { NONE_LABEL } from 'components/common/fields/Select';

export const BASE_URL = import.meta.env.VITE_GUARDIAN_BASE_URL;
const API_KEY_VALUE = import.meta.env.VITE_GUARDIAN_API_KEY;
export const GUARDIAN_API_SLUG = 'the-guardian';
export const IMMUTABLE_SEARCH_PARAMS = {
  'api-key': API_KEY_VALUE,
  'show-fields': 'thumbnail,trailText',
} as const;
export const SEARCH_PARAMS_MAP = [
  ['from', 'from-date'],
  ['to', 'to-date'],
  ['sortBy', 'order-by'],
  ['pageSize', 'page-size'],
] as const;

export const SORT_BY_OPTIONS = [
  { label: NONE_LABEL, value: '' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Relevance', value: 'relevance' },
] as const;
