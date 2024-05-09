import { CommonArticle } from 'types';
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
} from './newYorkTimesApi.constants';

class NewYorkTimesApi extends BaseNewsApi {
  private readonly newYorkTimesInitialSearchParams = INITIAL_SEARCH_PARAMS;

  private fetchedData: undefined | NewYorkTimesApiSuccessResponse;

  private readonly newYorkTimesRowsPerPageOptions = NY_TIMES_ROWS_RER_PAGE_OPTIONS;

  constructor() {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(NY_TIMES_API_SLUG, BASE_URL, immutableSearchParams);
  }

  get transformedSearchParams(): string {
    const transformedSearchParams = new URLSearchParams(this.currentSearchParamsString);
    const currentPage =
      transformedSearchParams.get(SEARCH_PARAM_KEYS.page) ?? INITIAL_SEARCH_PARAMS.page;
    transformedSearchParams.set(SEARCH_PARAM_KEYS.page, `${Number(currentPage) - 1}`);

    SEARCH_PARAMS_MAP.forEach(([oldKey, newKey]) => {
      const searchParamValue = transformedSearchParams.get(oldKey);

      if (newKey && searchParamValue) {
        transformedSearchParams.set(newKey, searchParamValue);
      }
      transformedSearchParams.delete(oldKey);
    });

    return transformedSearchParams.toString();
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

  get currentPage(): number {
    if (!this.fetchedData) return 1;

    return this.fetchedData.response.meta.offset / this.newYorkTimesRowsPerPageOptions[0] + 1;
  }

  get currentPageSize(): number {
    return this.newYorkTimesRowsPerPageOptions[0];
  }

  get initialSearchParamsString(): string {
    return new URLSearchParams(this.newYorkTimesInitialSearchParams).toString();
  }

  get rowsPerPageOptions(): number[] {
    return [...this.newYorkTimesRowsPerPageOptions];
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.response.meta.hits;
  }

  async fetchNews(search: string): Promise<NewYorkTimesApiSuccessResponse> {
    this.currentSearchParamsString = search;
    const response = await fetch(this.constructFullUrl());

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
