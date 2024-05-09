import { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';

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

type FiltersFabsProps = { filtersFormId: string };

const FiltersFabs: FC<FiltersFabsProps> = ({ filtersFormId }) => {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Fade in={isDirty} timeout={250}>
      <FilterFabsBox>
        <Fab aria-label="clear filters" form={filtersFormId} size="small" type="reset">
          <CloseIcon />
        </Fab>
        <Fab aria-label="apply filters" color="primary" form={filtersFormId} type="submit">
          <CheckIcon />
        </Fab>
      </FilterFabsBox>
    </Fade>
  );
};

export default FiltersFabs;
