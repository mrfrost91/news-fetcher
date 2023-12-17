import { styled } from '@mui/material/styles';

export const NewsCardsWrapper = styled('div')`
  --news-cards-columns: 4;
  --news-cards-gap: ${({ theme }) => theme.spacing(2)};
  display: grid;
  grid-template-columns: repeat(var(--news-cards-columns), 1fr);
  grid-gap: var(--news-cards-gap);
  margin-top: var(--news-cards-gap);
  margin-bottom: var(--news-cards-gap);

  ${({ theme }) => theme.breakpoints.down('lg')} {
    --news-cards-columns: 3;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    --news-cards-columns: 2;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    --news-cards-columns: 1;
  }
`;

export const NewsFeedFiltersStyledForm = styled('form')`
  --news-filter-colums: 5;
  --news-filter-gap: ${({ theme }) => theme.spacing(2)};
  margin-top: var(--news-filter-gap);
  display: grid;
  gap: var(--news-filter-gap);
  grid-template-columns: repeat(var(--news-filter-colums), 1fr);

  ${({ theme }) => theme.breakpoints.down('md')} {
    --news-filter-colums: 3;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    --news-filter-colums: 2;
  }
`;
