import { FC } from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CommonArticle } from 'types';
import NewsImage from './NewsImage';
import { StyledCard, StyledCardActions } from './NewsCard.styled';

const NewsCard: FC<CommonArticle> = ({ urlToImage, description, publishedAt, title, url }) => (
  <StyledCard>
    <NewsImage imgSrc={urlToImage} />
    <CardContent>
      <Typography align="left" gutterBottom variant="h6" component="div">
        {title}
      </Typography>
      <Typography align="left" variant="caption" component="p" gutterBottom>
        {`Publish Date: ${new Date(publishedAt).toLocaleString()}`}
      </Typography>
      <Typography align="left" variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <StyledCardActions>
      <a href={url} target="_blank" rel="noreferrer">
        <Button size="small">Read Full Article</Button>
      </a>
    </StyledCardActions>
  </StyledCard>
);

export default NewsCard;
