import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import { ColorModeProvider } from './context/ColorModeContext';

function App() {
  return (
    <Provider store={store}>
      <ColorModeProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </ColorModeProvider>
    </Provider>
  );
}

export default App;
