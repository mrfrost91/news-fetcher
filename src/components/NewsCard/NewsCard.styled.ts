import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledCardActions = styled(CardActions)`
  margin-top: auto;
`;

export { StyledCard, StyledCardActions };
