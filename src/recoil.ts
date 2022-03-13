import { atom } from 'recoil';

let defaultTheme = 'DARK';
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; //get the default prefered mode
defaultTheme = isDarkMode ? 'DARK' : 'LIGHT';

export const themeMode = atom({
  key: 'theme',
  default: defaultTheme,
});
