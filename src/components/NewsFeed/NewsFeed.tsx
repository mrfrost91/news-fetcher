import { ChangeEventHandler, FC, MouseEvent } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { NewsCard } from 'components/NewsCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNewsApi } from 'hooks';
import { OverlaidLoader } from 'components/common/loader/OverlaidLoader';
import { SEARCH_PARAM_KEYS } from 'api';
import Box from '@mui/material/Box';
import { NewsCardsWrapper } from './NewsFeed.styled';
import NewsFeedError from './NewsFeedError';
import NewsFeedFilters from './NewsFeedFilters';
import NewsFeedFormProvider from './NewsFeedFormProvider';

const NewsFeed: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const {
    loading,
    error,
    retry,
    apiData: { articles, currentPage, currentPageSize, totalResults },
    apiMethods,
    apiOptions: { rowsPerPageOptions, sortByOptions },
  } = useNewsApi();

  const handlePageChange = (_: MouseEvent<HTMLButtonElement> | null, value: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set(SEARCH_PARAM_KEYS.page, (value + 1).toString());
    navigate({ search: searchParams.toString() });
  };

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set(SEARCH_PARAM_KEYS.pageSize, event.target.value);
    navigate({ search: searchParams.toString() });
  };

  return (
    <NewsFeedFormProvider>
      <NewsFeedFilters sortByOptions={sortByOptions} disableFilters={loading} />
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
        {!error && totalResults === 0 && (
          <p style={{ margin: 'auto' }}>No results, try changing your filters</p>
        )}
        {!!error && (
          <Box sx={{ margin: 'auto' }}>
            <NewsFeedError error={error} loading={loading} retry={retry} />
          </Box>
        )}
      </OverlaidLoader>
    </NewsFeedFormProvider>
  );
};

export default NewsFeed;
