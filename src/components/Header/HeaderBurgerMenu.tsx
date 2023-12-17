import { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import BrushIcon from '@mui/icons-material/Brush';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Select } from 'components/common/fields/Select';
import Drawer from '@mui/material/Drawer';
import { SelectChangeEvent } from '@mui/material';
import { ColorSettings } from 'context/ColorSettingContext';
import IconButton from '@mui/material/IconButton';
import { COLOR_SETTING_KEY, COLOR_SETTINGS } from 'constants';
import { useColorSettingContext } from 'hooks';

type HeaderBurgerMenuProps = {
  isOpen: boolean;
  handleBurgerMenuClose: () => void;
};

const COLOR_SETTING_OPTIONS = [
  {
    label: 'Defined by the system',
    value: COLOR_SETTINGS.definedByTheSystem,
  },
  { label: 'Light', value: COLOR_SETTINGS.light },
  { label: 'Dark', value: COLOR_SETTINGS.dark },
];

const HeaderBurgerMenu: FC<HeaderBurgerMenuProps> = ({ isOpen, handleBurgerMenuClose }) => {
  const { colorSetting, setColorSetting } = useColorSettingContext();

  const handleColorSettingChange = <T,>(event: SelectChangeEvent<T>): void => {
    const newColorSetting = event.target.value as ColorSettings;
    localStorage.setItem(COLOR_SETTING_KEY, newColorSetting);
    setColorSetting(newColorSetting);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleBurgerMenuClose}>
      <Box p={1} pb={0}>
        <IconButton color="inherit" aria-label="close-burger-menu" onClick={handleBurgerMenuClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem sx={{ columnGap: '16px' }}>
          <BrushIcon />
          <ListItemText primary="Color mode" />
          <Box maxWidth={120} width={120}>
            <Select
              name="color-mode-setting"
              value={colorSetting}
              onChange={handleColorSettingChange}
              options={COLOR_SETTING_OPTIONS}
            />
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default HeaderBurgerMenu;
