import {useTheme} from '../../context/theme/useTheme.ts';
import {MoonStar, Sun} from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === 'light' ? <Sun color="black" /> : <MoonStar color="yellow" />}
    </button>
  )
}
