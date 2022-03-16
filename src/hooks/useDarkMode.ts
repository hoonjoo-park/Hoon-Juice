import { useRecoilState } from 'recoil';
import { themeMode } from '../recoil';

export default () => {
  const [theme, setTheme] = useRecoilState(themeMode);
  const saveTheme = (chosenTheme: string) => {
    setTheme(chosenTheme);
    window.localStorage.setItem('THEME', chosenTheme);
    document.body.className = chosenTheme;
  };

  const toggleTheme: any = () => {
    saveTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT');
  };

  return [theme, toggleTheme];
};
