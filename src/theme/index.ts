import { Platform } from "react-native";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};
const fontsize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
};
const borderRadius = {
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
  full: '50%',
};
type FontWeight =
  | 'normal'
  | 'black'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'ultralight'
  | 'thin'
  | 'light'
  | undefined;

type Font = {
  fontFamily: string;
  fontWeight: FontWeight;
};

type Fonts = {
  regular: Font;
  medium: Font;
  bold: Font;
  heavy: Font;
};

const fonts: Fonts = Platform.select({
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as FontWeight,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as FontWeight,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '800' as FontWeight,
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '900' as FontWeight,
    },
  },
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: '400' as FontWeight,
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: '500' as FontWeight,
    },
    bold: {
      fontFamily: 'sans-serif',
      fontWeight: '800' as FontWeight,
    },
    heavy: {
      fontFamily: 'sans-serif',
      fontWeight: '900' as FontWeight,
    },
  },
});

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    primary: '#386BF6',
    background: '#F5F5F5',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
  spacing,
  fontsize,
  borderRadius,
  fonts,
};
export const DarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    primary: '#386BF6',
    secondary: '#F8ACA6',
    tertiary: '#F6CD38',
    background: '#121212',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 234)',
    border: 'rgb(84, 84, 88)',
    notification: 'rgb(255, 69, 58)',
  },
  spacing,
  fontsize,
  borderRadius,
  fonts,
};

export type Theme = typeof DefaultTheme;
export type DarkThemeType = typeof DarkTheme;