import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import HeaderBurgerMenu from 'components/Header/HeaderBurgerMenu';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleBurgerMenuClose = () => {
    setIsDrawerOpen(false);
  };

  const handleBurgerMenuOpen = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="burger-menu"
            sx={{ mr: 1 }}
            onClick={handleBurgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            News Feed
          </Typography>
        </Toolbar>
      </AppBar>
      <HeaderBurgerMenu isOpen={isDrawerOpen} handleBurgerMenuClose={handleBurgerMenuClose} />
    </>
  );
};

export default Header;
