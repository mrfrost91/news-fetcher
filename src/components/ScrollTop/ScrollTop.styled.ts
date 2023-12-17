import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledScrollBtnBox = styled(Box)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(2)};
`;

export default StyledScrollBtnBox;
