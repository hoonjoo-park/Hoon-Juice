import { atom } from 'recoil';

const getTheme = () => {
  if (document.body) {
    return document.body.className;
  }
};

export const themeMode = atom({
  key: 'theme',
  default: getTheme(),
});
