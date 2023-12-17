import {
  BASE_ROWS_RER_PAGE_OPTIONS,
  INITIAL_SEARCH_PARAMS,
  SEARCH_PARAM_KEYS,
} from './baseNewsApi.constants';

export class BaseNewsApi {
  private readonly baseUrl: string;

  private readonly immutableSearchParams: URLSearchParams;

  private readonly searchParams: URLSearchParams;

  private readonly baseRowsPerPageOptions = BASE_ROWS_RER_PAGE_OPTIONS;

  constructor(baseUrl: string, immutableSearchParams: URLSearchParams, searchParams?: string) {
    this.baseUrl = baseUrl;
    this.immutableSearchParams = immutableSearchParams;
    this.searchParams = searchParams
      ? new URLSearchParams(searchParams)
      : new URLSearchParams(INITIAL_SEARCH_PARAMS);
  }

  get currentPage(): number {
    return Number(this.searchParams.get(SEARCH_PARAM_KEYS.page));
  }

  setCurrentPage(value: string) {
    this.searchParams.set(SEARCH_PARAM_KEYS.page, value);
  }

  get currentPageSize(): number {
    return Number(this.searchParams.get(SEARCH_PARAM_KEYS.pageSize));
  }

  setCurrentPageSize(value: string) {
    this.searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_SEARCH_PARAMS[SEARCH_PARAM_KEYS.page]);
    this.searchParams.set(SEARCH_PARAM_KEYS.pageSize, value);
  }

  setCurrentSearch(value: string) {
    if (value) {
      this.searchParams.set(SEARCH_PARAM_KEYS.query, value);
    } else {
      this.searchParams.delete(SEARCH_PARAM_KEYS.query);
    }
    this.searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_SEARCH_PARAMS[SEARCH_PARAM_KEYS.page]);
  }

  setCurrentFromDate(value: string | null) {
    if (value) {
      this.searchParams.set(SEARCH_PARAM_KEYS.from, value);
    } else {
      this.searchParams.delete(SEARCH_PARAM_KEYS.from);
    }
    this.searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_SEARCH_PARAMS[SEARCH_PARAM_KEYS.page]);
  }

  setCurrentToDate(value: string | null) {
    if (value) {
      this.searchParams.set(SEARCH_PARAM_KEYS.to, value);
    } else {
      this.searchParams.delete(SEARCH_PARAM_KEYS.to);
    }
    this.searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_SEARCH_PARAMS[SEARCH_PARAM_KEYS.page]);
  }

  setCurrentSortBy(value: string) {
    if (value) {
      this.searchParams.set(SEARCH_PARAM_KEYS.sortBy, value);
    } else {
      this.searchParams.delete(SEARCH_PARAM_KEYS.sortBy);
    }
    this.searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_SEARCH_PARAMS[SEARCH_PARAM_KEYS.page]);
  }

  get stringifiedSearchParams(): string {
    const stringifiedSearchParams = this.searchParams.toString();

    return stringifiedSearchParams && `?${stringifiedSearchParams}`;
  }

  get rowsPerPageOptions(): number[] {
    return this.baseRowsPerPageOptions;
  }

  get mappedSearchParams(): URLSearchParams {
    return this.searchParams;
  }

  private get searchParamsInApiSpecificFormat(): string {
    const mergedSearchParams = new URLSearchParams(this.mappedSearchParams);
    this.immutableSearchParams.forEach((value, key) => {
      mergedSearchParams.set(key, value);
    });

    return `?${mergedSearchParams.toString()}`;
  }

  get stringifiedUrl(): string {
    return `${this.baseUrl}${this.searchParamsInApiSpecificFormat}`;
  }
}
