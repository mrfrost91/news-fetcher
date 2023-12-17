import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const StyledMainContainer = styled(Container)`
  --main-container-lr-paddings: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.height.header}px var(--main-container-lr-paddings) ${theme.spacing(2)}`};
  text-align: center;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    --main-container-lr-paddings: ${({ theme }) => theme.spacing(1.5)};
  }
`;
