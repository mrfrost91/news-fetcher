import ReactDOM from 'react-dom/client';
import { ColorSettingContextProvider } from 'context/ColorSettingContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ColorSettingContextProvider>
    <App />
  </ColorSettingContextProvider>,
);
