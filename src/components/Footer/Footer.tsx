import { FC } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  min-height: ${({ theme }) => `${theme.height.footer}px`};
  padding: ${({ theme }) => theme.spacing(1)};
  text-align: center;
  width: 100%;
`;

const Footer: FC = () => (
  <>
    <Divider />
    <StyledBox component="footer">© Eugene Averyanov 2023</StyledBox>
  </>
);

export default Footer;
