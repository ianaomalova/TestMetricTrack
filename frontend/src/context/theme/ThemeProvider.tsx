import {type FC, type ReactNode, useEffect, useState} from 'react';
import {ThemeContext, type Theme} from './ThemeContext.ts';

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({children}) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
