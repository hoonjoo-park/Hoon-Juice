import { atom } from 'recoil';

const getTheme = () => {
  const savedTheme = window.localStorage.getItem('THEME');
  if (savedTheme) {
    return savedTheme;
  } else {
    return 'DARK';
  }
};

export const themeMode = atom({
  key: 'theme',
  default: getTheme(),
});
