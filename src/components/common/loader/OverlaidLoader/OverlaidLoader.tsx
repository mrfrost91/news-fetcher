import { FC } from 'react';
import { FCWithChildren } from 'types';
import {
  LoaderOverlay,
  OverlaidLoaderWrapper,
  StickyCircularProgress,
} from './OverlaidLoader.styled';

type LoaderOverlayProps = {
  loading: boolean;
} & FCWithChildren;

const OverlaidLoader: FC<LoaderOverlayProps> = ({ loading, children }) => {
  if (!loading) {
    return children;
  }

  return (
    <OverlaidLoaderWrapper>
      {children}
      <LoaderOverlay>
        <StickyCircularProgress size={50} />
      </LoaderOverlay>
    </OverlaidLoaderWrapper>
  );
};

export default OverlaidLoader;
