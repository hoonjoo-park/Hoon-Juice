import { atom } from 'recoil';

export const themeMode = atom({
  key: 'theme',
  default: document.body.className,
});
