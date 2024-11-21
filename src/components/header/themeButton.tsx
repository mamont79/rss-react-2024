import { THEME } from '../../constants/constants';
import { useTheme } from '../../context/context';
import { useLocalStorage } from '../../customHooks/useLocalStorage';

export const ThemeButton = () => {
  const { themeType, setCurrentTheme } = useTheme();
  const [, setLsTheme] = useLocalStorage(THEME);

  const setTheme = () => {
    const currentTheme = themeType === 'classic' ? 'golden' : 'classic';
    setCurrentTheme(currentTheme);
    setLsTheme(currentTheme);
  };

  return (
    <div>
      <button onClick={setTheme} className="theme-button">
        {themeType}
      </button>
    </div>
  );
};
