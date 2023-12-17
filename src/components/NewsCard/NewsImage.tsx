import { FC, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorText, NewsImageWrapper, StyledNewsImage } from './NewsImage.styled';

type NewsImageProps = { imgSrc?: string | null };

const NewsImage: FC<NewsImageProps> = ({ imgSrc }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!imgSrc) {
    return <NewsImageWrapper>No illustration provided</NewsImageWrapper>;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <NewsImageWrapper>
      {isLoading && <CircularProgress size={20} />}
      {error && <ErrorText>Failed to load image</ErrorText>}
      <StyledNewsImage
        shouldShow={!isLoading && !error}
        onError={handleError}
        onLoad={handleLoad}
        alt={imgSrc}
        src={imgSrc}
      />
    </NewsImageWrapper>
  );
};

export default NewsImage;
