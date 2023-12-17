import { ReactNode } from 'react';

export type CommonArticle = {
  url: string;
  urlToImage: string | null;
  description: string;
  publishedAt: string;
  title: string;
};

export type FCWithChildren = { children?: ReactNode };
