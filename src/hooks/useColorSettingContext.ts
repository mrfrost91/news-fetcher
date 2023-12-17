import { useContext } from 'react';
import { ColorSettingContext, ColorSettingContextType } from 'context/ColorSettingContext';

const useColorSettingContext = (): ColorSettingContextType => {
  const context = useContext(ColorSettingContext);

  if (context === null) {
    throw new Error('useColorSettingContext must be used within ColorSettingContextProvider');
  }

  return context;
};

export default useColorSettingContext;
