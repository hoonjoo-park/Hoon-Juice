import { atom } from 'recoil';

const getTheme = () => {
  const savedTheme = window.localStorage.getItem('THEME');
  if (savedTheme) {
    return savedTheme;
  } else {
    const isDarkMode =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = isDarkMode ? 'DARK' : 'LIGHT';
    return defaultTheme;
  }
};

export const themeMode = atom({
  key: 'theme',
  default: getTheme(),
});
