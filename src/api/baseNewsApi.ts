import { ApiSlug } from 'api/types';
import { SortByOptions } from 'types';
import {
  BASE_ROWS_RER_PAGE_OPTIONS,
  INITIAL_SEARCH_PARAMS,
  SORT_BY_OPTIONS,
} from './baseNewsApi.constants';

export class BaseNewsApi {
  private readonly apiSlug: ApiSlug;

  private readonly baseUrl: string;

  private readonly immutableSearchParams: URLSearchParams;

  private readonly baseInitialSearchParams = INITIAL_SEARCH_PARAMS;

  private readonly sortByOptions = SORT_BY_OPTIONS;

  private searchParamsString: string | undefined;

  private readonly baseRowsPerPageOptions = BASE_ROWS_RER_PAGE_OPTIONS;

  constructor(apiSlug: ApiSlug, baseUrl: string, immutableSearchParams: URLSearchParams) {
    this.apiSlug = apiSlug;
    this.baseUrl = baseUrl;
    this.immutableSearchParams = immutableSearchParams;
  }

  get currentApiSlug() {
    return this.apiSlug;
  }

  get currentSearchParamsString(): string {
    if (!this.searchParamsString) return '';

    return this.searchParamsString;
  }

  set currentSearchParamsString(value: string) {
    this.searchParamsString = value;
  }

  get currentSortByOptions(): SortByOptions {
    return this.sortByOptions;
  }

  get initialSearchParamsString(): string {
    return new URLSearchParams(this.baseInitialSearchParams).toString();
  }

  get rowsPerPageOptions(): number[] {
    return [...this.baseRowsPerPageOptions];
  }

  get transformedSearchParams(): string {
    return this.currentSearchParamsString;
  }

  private get mergedSearchParams(): string {
    const mergedSearchParams = new URLSearchParams(this.transformedSearchParams);
    this.immutableSearchParams.forEach((value, key) => {
      mergedSearchParams.set(key, value);
    });

    return `?${mergedSearchParams.toString()}`;
  }

  constructFullUrl(): string {
    return `${this.baseUrl}${this.mergedSearchParams}`;
  }
}
