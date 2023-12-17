export type NewsApiSearchParams = {
  apiKey: string;
  q?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
};

export type NewsApiArticle = {
  author: string | null;
  content: string;
  description: string | null;
  publishedAt: string;
  source: { id: null | number; name: string };
  title: string;
  url: string;
  urlToImage: string | null;
};

export type NewsApiSuccessResponse = {
  articles: NewsApiArticle[];
  totalResults: number;
  status: 'ok';
};

export type NewsApiErrorResponse = {
  code: string;
  message: string;
  status: 'error';
};
