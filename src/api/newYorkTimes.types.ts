export type NewYorkTimesApiSearchParams = {
  'api-key': string;
  q?: string;
  begin_date?: string;
  end_date?: string;
  sort?: 'newest' | 'oldest' | 'relevance';
  page?: number;
};

type Multimedia = {
  rank: number;
  subtype: number;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  };
  subType: string;
  crop_name: string;
};

type Headline = {
  main: string;
  kicker: string;
  content_kicker: string | null;
  print_headline: string;
  name: string | null;
  seo: string | null;
  sub: string | null;
};

type Keyword = {
  name: string;
  value: string;
  rank: number;
  major: string;
};

type Person = {
  firstname: string;
  middlename: string | null;
  lastname: string;
  qualifier: string | null;
  title: string | null;
  role: string;
  organization: string;
  rank: number;
};

type Byline = {
  original: string;
  person: Person[];
  organization: string | null;
};

export type NewYorkTimesApiArticle = {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};

type NewYorkTimesApiMeta = {
  hits: number;
  offset: number;
  time: number;
};

export type NewYorkTimesApiSuccessResponse = {
  status: 'OK';
  copyright: string;
  response: {
    docs: NewYorkTimesApiArticle[];
    meta: NewYorkTimesApiMeta;
  };
};

type NewYorkTimesApiFirstTypeErrorResponse = {
  fault: {
    faultstring: string;
    detail: {
      errorcode: string;
    };
  };
};

type NewYorkTimesApiSecondTypeErrorResponse = {
  status: 'ERROR';
  copyright: string;
  errors: string[];
};

export type NewYorkTimesApiErrorResponse =
  | NewYorkTimesApiFirstTypeErrorResponse
  | NewYorkTimesApiSecondTypeErrorResponse;
