import { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('dark'); // Modo oscuro por defecto

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#181a1b',
                  paper: '#23272a',
                },
                primary: {
                  main: '#90caf9',
                },
                secondary: {
                  main: '#f48fb1',
                },
                text: {
                  primary: '#e0e0e0',
                  secondary: '#b0b0b0',
                },
              }
            : {
                background: {
                  default: '#ffffff', // Fondo blanco real
                  paper: '#f4f6f8',   // Paper más claro
                },
                primary: {
                  main: '#1976d2',
                },
                secondary: {
                  main: '#d81b60',
                },
                text: {
                  primary: '#222222', // Texto bien oscuro
                  secondary: '#555555',
                },
              }),
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}