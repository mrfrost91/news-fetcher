import { ChangeEventHandler, FC, MouseEvent, useCallback, useMemo } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { NewsCard } from 'components/NewsCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNewsApis } from 'hooks';
import { OverlaidLoader } from 'components/common/loader/OverlaidLoader';
import { SelectChangeEvent } from '@mui/material';
import { ApiSlug } from 'api/types';
import { SEARCH_PARAM_KEYS } from 'api';
import { INITIAL_SEARCH_PARAMS } from 'api/baseNewsApi.constants';
import Box from '@mui/material/Box';
import { NewsCardsWrapper } from './NewsFeed.styled';
import NewsFeedError from './NewsFeedError';
import NewsFeedFilters from './NewsFeedFilters';

const NewsFeed: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const {
    loading,
    error,
    retry,
    apiData: { articles, totalResults },
    apiMethods,
    apiOptions: { rowsPerPageOptions, sortByOptions },
  } = useNewsApis();

  const { currentPage, currentPageSize } = useMemo(() => {
    const searchParams = new URLSearchParams(search);

    return {
      currentPage: Number(searchParams.get(SEARCH_PARAM_KEYS.page) ?? INITIAL_SEARCH_PARAMS.page),
      currentPageSize: Number(
        searchParams.get(SEARCH_PARAM_KEYS.pageSize) ?? INITIAL_SEARCH_PARAMS.pageSize,
      ),
    };
  }, [search]);

  const handleSourceChange = <T,>(event: SelectChangeEvent<T>) => {
    const apiSlug = event.target.value as ApiSlug;
    navigate({ pathname: `../${apiSlug}` });
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      apiMethods.setCurrentSearch(event.target.value);
      const currentSearchParams = apiMethods.getCurrentSearchParams();
      navigate({ search: currentSearchParams });
    },
    [apiMethods, navigate],
  );

  const handleFromDateChange = (value: string | null) => {
    apiMethods.setCurrentFromDate(value);
    const currentSearchParams = apiMethods.getCurrentSearchParams();
    navigate({ search: currentSearchParams });
  };

  const handleToDateChange = (value: string | null) => {
    apiMethods.setCurrentToDate(value);
    const currentSearchParams = apiMethods.getCurrentSearchParams();
    navigate({ search: currentSearchParams });
  };

  const handleSortByChange = <T,>(event: SelectChangeEvent<T>) => {
    const newSortByValue = event.target.value as string;
    apiMethods.setCurrentSortBy(newSortByValue);
    const currentSearchParams = apiMethods.getCurrentSearchParams();
    navigate({ search: currentSearchParams });
  };

  const handlePageChange = (_: MouseEvent<HTMLButtonElement> | null, value: number) => {
    apiMethods.setCurrentPage((value + 1).toString());
    const currentSearchParams = apiMethods.getCurrentSearchParams();
    navigate({ search: currentSearchParams });
  };

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event) => {
    apiMethods.setCurrentPageSize(event.target.value);
    const currentSearchParams = apiMethods.getCurrentSearchParams();
    navigate({ search: currentSearchParams });
  };

  return (
    <>
      <NewsFeedFilters
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
        handleSearchChange={handleSearchChange}
        handleSourceChange={handleSourceChange}
        handleSortByChange={handleSortByChange}
        sortByOptions={sortByOptions}
        disableFilters={loading}
      />
      <OverlaidLoader loading={loading}>
        {!error && !!totalResults && (
          <>
            <NewsCardsWrapper>
              {articles.map((_, idx) => {
                const commonArticle = apiMethods.getCommonFormatArticle(idx);

                return (
                  <NewsCard
                    key={commonArticle.url}
                    urlToImage={commonArticle.urlToImage}
                    description={commonArticle.description}
                    publishedAt={commonArticle.publishedAt}
                    title={commonArticle.title}
                    url={commonArticle.url}
                  />
                );
              })}
            </NewsCardsWrapper>
            <TablePagination
              sx={{ marginTop: 'auto' }}
              component="div"
              disabled={loading}
              page={currentPage - 1}
              count={totalResults}
              rowsPerPage={currentPageSize}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage=""
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </>
        )}
        {!error && !totalResults && (
          <p style={{ margin: 'auto' }}>No results, try changing your filters</p>
        )}
        {!!error && (
          <Box sx={{ margin: 'auto' }}>
            <NewsFeedError error={error} loading={loading} retry={retry} />
          </Box>
        )}
      </OverlaidLoader>
    </>
  );
};

export default NewsFeed;
