import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { FILTERS_FORM_ID } from 'components/NewsFeed/NewsFeedFilters';

const FilterFabsBox = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  row-gap: ${({ theme }) => theme.spacing(1)};
  bottom: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
  z-index: 2;
`;

const FiltersFabs: FC = () => {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Fade in={isDirty} timeout={250}>
      <FilterFabsBox>
        <Fab aria-label="clear filters" form={FILTERS_FORM_ID} size="small" type="reset">
          <CloseIcon />
        </Fab>
        <Fab aria-label="apply filters" color="primary" form={FILTERS_FORM_ID} type="submit">
          <CheckIcon />
        </Fab>
      </FilterFabsBox>
    </Fade>
  );
};

export default FiltersFabs;
