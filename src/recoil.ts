import { atom } from 'recoil';

const getTheme = () => {
  let defaultTheme;
  if (typeof window !== 'undefined') {
    const savedTheme = window.localStorage.getItem('THEME');
    if (savedTheme) {
      defaultTheme = savedTheme;
      return defaultTheme;
    } else {
      const isDarkMode =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; //get the default prefered mode
      defaultTheme = isDarkMode ? 'DARK' : 'LIGHT';
      return defaultTheme;
    }
  }
};

export const themeMode = atom({
  key: 'theme',
  default: getTheme(),
});
