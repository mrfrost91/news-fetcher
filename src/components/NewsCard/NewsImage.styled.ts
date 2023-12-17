import { styled } from '@mui/material/styles';

const IMAGE_HEIGHT = 140;

export const NewsImageWrapper = styled('div')`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${IMAGE_HEIGHT}px;
  height: ${IMAGE_HEIGHT}px;
  width: 100%;
`;

export const StyledNewsImage = styled('img')<{ shouldShow?: boolean }>`
  ${({ shouldShow = false }) => `display: ${shouldShow ? 'initial' : 'none'};`}
  height: ${IMAGE_HEIGHT}px;
  min-height: ${IMAGE_HEIGHT}px;
  object-fit: cover;
  width: 100%;
`;

export const ErrorText = styled('span')`
  color: ${({ theme }) => theme.palette.error.light};
`;
