import { FC } from 'react';
import { FCWithChildren } from 'types/globalTypes';
import { StyledMainContainer } from './MainContainer.styled';

const MainContainer: FC<FCWithChildren> = ({ children }) => (
  <StyledMainContainer maxWidth="lg">{children}</StyledMainContainer>
);

export default MainContainer;
