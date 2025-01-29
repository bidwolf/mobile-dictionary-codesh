import { Navigation } from '@routes/app.routes';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from './theme';

function App(): React.JSX.Element {
  const scheme = useColorScheme()
  return (
    <Navigation theme={scheme === "dark" ? DarkTheme : DefaultTheme} />
  );
}


export default App;
