import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FC } from 'react';

type NewsFeedErrorProps = {
  error: Error;
  loading: boolean;
  retry: () => void;
};

const NewsFeedError: FC<NewsFeedErrorProps> = ({ error, loading, retry }) => {
  return (
    <>
      <Typography variant="body1" color="error" gutterBottom>
        {error.message}
      </Typography>
      <Button
        color="error"
        endIcon={<RefreshIcon />}
        disabled={loading}
        variant="contained"
        onClick={retry}
      >
        Retry
      </Button>
    </>
  );
};

export default NewsFeedError;
