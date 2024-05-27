import { useCallback, useRef, useState } from 'react';
import { ApiFactory } from 'api';
import { useLocation, useParams } from 'react-router-dom';
import { ApiSlugParam, ApiInstance } from 'api/types';
import { ROUTE_PARAMS } from 'router';
import { ABORT_ERROR } from 'constants';
import { useAbortController } from './index';

const useNewsApi = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<number>(() => Date.now());
  const { [ROUTE_PARAMS.source.slug]: source } = useParams<ApiSlugParam>();
  const { search } = useLocation();
  const api = useRef<ApiInstance>(ApiFactory.createApi(source));

  const getNews = useCallback(
    async (signal: AbortSignal) => {
      if (!search) {
        return;
      }

      const shouldCreateNewInstance = api.current.apiSlug !== source;
      const apiToUse = shouldCreateNewInstance ? ApiFactory.createApi(source) : api.current;

      try {
        setLoading(true);
        await apiToUse.fetchNews(search, signal);
        setError(null);
        setLoading(false);

        if (shouldCreateNewInstance) {
          api.current = apiToUse;
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== ABORT_ERROR) {
          setLoading(false);
          setError(err);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [source, search, trigger],
  );

  const retry = useCallback(() => {
    setTrigger(Date.now());
  }, []);

  useAbortController(getNews);

  return {
    apiData: {
      articles: api.current.articles,
      totalResults: api.current.totalResults,
      currentPage: api.current.currentPage,
      currentPageSize: api.current.currentPageSize,
    },
    apiMethods: {
      getCommonFormatArticle(idx: number) {
        return api.current.getCommonFormatArticle(idx);
      },
    },
    apiOptions: {
      rowsPerPageOptions: api.current.rowsPerPageOptions,
      sortByOptions: api.current.sortByOptions,
    },
    apiSearchParamsString: api.current.searchParamsString,
    error,
    loading,
    retry,
  };
};

export default useNewsApi;
