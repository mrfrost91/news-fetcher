import { CommonArticle } from 'types/globalTypes';
import { NewsApiArticle, NewsApiErrorResponse, NewsApiSuccessResponse } from './newsApi.types';
import { BaseNewsApi } from './baseNewsApi';
import {
  BASE_URL,
  IMMUTABLE_SEARCH_PARAMS,
  NEWS_API_SLUG,
  SORT_BY_OPTIONS,
} from './newsApi.constants';

class NewsApi extends BaseNewsApi {
  private readonly apiSlug = NEWS_API_SLUG;

  private readonly sortByOptions = SORT_BY_OPTIONS;

  private fetchedData: undefined | NewsApiSuccessResponse;

  constructor(searchParams?: string) {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(BASE_URL, immutableSearchParams, searchParams);
  }

  get currentApiSlug() {
    return this.apiSlug;
  }

  get currentSortByOptions() {
    return this.sortByOptions;
  }

  get articles(): NewsApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.articles;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    const description = this.articles[articleIndex].description ?? '';
    const filteredDescription =
      description && description.replace(/<\w+>/g, '').replace(/<\/\w+>/g, '');

    return {
      url: this.articles[articleIndex].url,
      urlToImage: this.articles[articleIndex].urlToImage,
      description: filteredDescription,
      publishedAt: this.articles[articleIndex].publishedAt,
      title: this.articles[articleIndex].title,
    };
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.totalResults;
  }

  async fetchNews(): Promise<NewsApiSuccessResponse> {
    const response = await fetch(this.stringifiedUrl);

    if (!response.ok) {
      const errorData = (await response.json()) as NewsApiErrorResponse;
      throw new Error(errorData.message);
    }

    this.fetchedData = (await response.json()) as NewsApiSuccessResponse;

    return this.fetchedData;
  }
}

export default NewsApi;
