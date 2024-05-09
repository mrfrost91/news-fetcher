import { ApiSlug } from 'api/types';
import { RowsPerPageOptions, SortByOptions } from 'types';
import { ApiAuth } from 'api/apiAuth';
import {
  BASE_ROWS_RER_PAGE_OPTIONS,
  BASE_INITIAL_SEARCH_PARAMS,
  BASE_SORT_BY_OPTIONS,
} from './baseNewsApi.constants';

type FetchedData<T> = T | undefined;

export class BaseNewsApi<T> extends ApiAuth {
  #fetchedData: FetchedData<T>;

  #searchParamsString: string;

  readonly #sortByOptions: SortByOptions;

  readonly #rowsPerPageOptions: RowsPerPageOptions;

  constructor(
    apiSlug: ApiSlug,
    baseUrl: string,
    essentialSearchParams: URLSearchParams,
    initialSearchParamsString: string = new URLSearchParams(BASE_INITIAL_SEARCH_PARAMS).toString(),
    sortByOptions: SortByOptions = BASE_SORT_BY_OPTIONS,
    rowsPerPageOptions: RowsPerPageOptions = BASE_ROWS_RER_PAGE_OPTIONS,
  ) {
    super(apiSlug, baseUrl, essentialSearchParams);
    this.#searchParamsString = initialSearchParamsString;
    this.#sortByOptions = sortByOptions;
    this.#rowsPerPageOptions = rowsPerPageOptions;
  }

  get fetchedData(): FetchedData<T> {
    return this.#fetchedData;
  }

  set fetchedData(value: FetchedData<T>) {
    this.#fetchedData = value;
  }

  get searchParamsString(): string {
    return this.#searchParamsString;
  }

  set searchParamsString(value: string) {
    this.#searchParamsString = value;
  }

  get sortByOptions(): SortByOptions {
    return this.#sortByOptions;
  }

  get rowsPerPageOptions(): number[] {
    return [...this.#rowsPerPageOptions];
  }

  get transformedSearchParams(): string {
    return this.searchParamsString;
  }

  private get mergedSearchParams(): string {
    const mergedSearchParams = new URLSearchParams(this.transformedSearchParams);
    this.essentialSearchParams.forEach((value, key) => {
      mergedSearchParams.set(key, value);
    });

    return `?${mergedSearchParams.toString()}`;
  }

  constructFullUrl(): string {
    return `${this.baseUrl}${this.mergedSearchParams}`;
  }
}
