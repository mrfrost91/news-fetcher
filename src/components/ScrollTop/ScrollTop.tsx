import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useScrollTrigger } from '@mui/material';
import StyledScrollBtnBox from './ScrollTop.styled';

const scrollTop = (): void => {
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, 50);
};

const ScrollTop = () => {
  const { pathname, search } = useLocation();
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    scrollTop();
  }, [pathname, search]);

  return (
    <Fade in={trigger} timeout={250}>
      <StyledScrollBtnBox onClick={scrollTop} role="presentation">
        <Fab aria-label="scroll back to top" color="primary">
          <KeyboardArrowUpIcon />
        </Fab>
      </StyledScrollBtnBox>
    </Fade>
  );
};

export default ScrollTop;
