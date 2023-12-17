import { CommonArticle } from 'types/globalTypes';
import { SEARCH_PARAM_KEYS } from './baseNewsApi.constants';
import {
  NewYorkTimesApiArticle,
  NewYorkTimesApiErrorResponse,
  NewYorkTimesApiSuccessResponse,
} from './newYorkTimes.types';
import { BaseNewsApi } from './baseNewsApi';
import {
  BASE_IMG_URL,
  BASE_URL,
  IMMUTABLE_SEARCH_PARAMS,
  INITIAL_SEARCH_PARAMS,
  NY_TIMES_API_SLUG,
  NY_TIMES_ROWS_RER_PAGE_OPTIONS,
  SEARCH_PARAMS_MAP,
  SORT_BY_OPTIONS,
} from './newYorkTimesApi.constants';

class NewYorkTimesApi extends BaseNewsApi {
  private readonly apiSlug = NY_TIMES_API_SLUG;

  private readonly sortByOptions = SORT_BY_OPTIONS;

  private fetchedData: undefined | NewYorkTimesApiSuccessResponse;

  private readonly pageSize: number = NY_TIMES_ROWS_RER_PAGE_OPTIONS[0];

  constructor(searchParams?: string) {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);
    const modifiedSearchParams = searchParams
      ? new URLSearchParams(searchParams)
      : new URLSearchParams(INITIAL_SEARCH_PARAMS);

    if (modifiedSearchParams.has(SEARCH_PARAM_KEYS.pageSize)) {
      modifiedSearchParams.delete(SEARCH_PARAM_KEYS.pageSize);
    }

    super(BASE_URL, immutableSearchParams, modifiedSearchParams.toString());
  }

  get currentApiSlug() {
    return this.apiSlug;
  }

  get currentSortByOptions() {
    return this.sortByOptions;
  }

  get currentPageSize(): number {
    return this.pageSize;
  }

  get mappedSearchParams(): URLSearchParams {
    const transformedSearchParams = new URLSearchParams(this.stringifiedSearchParams);
    const { currentPage } = this;
    transformedSearchParams.set(SEARCH_PARAM_KEYS.page, `${currentPage - 1}`);

    SEARCH_PARAMS_MAP.forEach(([oldKey, newKey]) => {
      const searchParamsValue = transformedSearchParams.get(oldKey);

      if (newKey && searchParamsValue) {
        transformedSearchParams.set(newKey, searchParamsValue);
      }
      transformedSearchParams.delete(oldKey);
    });

    return transformedSearchParams;
  }

  get articles(): NewYorkTimesApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.response.docs;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    const urlToImage = this.articles[articleIndex].multimedia[0]?.url ?? null;
    const fullUrlToImage = urlToImage && `${BASE_IMG_URL}${urlToImage}`;

    return {
      url: this.articles[articleIndex].web_url,
      urlToImage: fullUrlToImage,
      description: this.articles[articleIndex].lead_paragraph,
      publishedAt: this.articles[articleIndex].pub_date,
      title: this.articles[articleIndex].headline.main,
    };
  }

  get rowsPerPageOptions(): number[] {
    return [this.pageSize];
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.response.meta.hits;
  }

  async fetchNews(): Promise<NewYorkTimesApiSuccessResponse> {
    const response = await fetch(this.stringifiedUrl);

    if (!response.ok) {
      const errorData = (await response.json()) as NewYorkTimesApiErrorResponse;

      if ('errors' in errorData) {
        throw new Error(errorData.errors[0]);
      }

      if ('fault' in errorData) {
        throw new Error(errorData.fault.faultstring);
      }
      throw new Error('Something went wrong');
    }

    this.fetchedData = (await response.json()) as NewYorkTimesApiSuccessResponse;

    return this.fetchedData;
  }
}

export default NewYorkTimesApi;
