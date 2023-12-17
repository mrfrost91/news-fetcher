import { styled, alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

export const OverlaidLoaderWrapper = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const LoaderOverlay = styled('div')`
  background-color: ${({ theme }) => alpha(theme.palette.background.paper, 0.8)};
  padding-bottom: ${({ theme }) => theme.spacing(15)};
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;

export const StickyCircularProgress = styled(CircularProgress)`
  position: sticky;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
`;
