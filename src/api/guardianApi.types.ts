export type GuardianApiSearchParams = {
  'api-key': string;
  q?: string;
  'from-date'?: string;
  'to-date'?: string;
  'order-by'?: 'newest' | 'oldest' | 'relevance';
  page?: number;
  'page-size'?: number;
  'show-fields': 'thumbnail,trailText';
};

type GuardianApiArticleFields = {
  thumbnail: string;
  trailText: string;
};

export type GuardianApiArticle = {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: GuardianApiArticleFields;
};

export type GuardianApiSuccessResponse = {
  response: {
    results: GuardianApiArticle[];
    status: 'ok';
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: 'newest' | 'oldest' | 'relevance';
  };
};

export type GuardianApiErrorResponse = {
  response: {
    status: 'error';
    message: string;
  };
};
