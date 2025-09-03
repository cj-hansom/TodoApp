import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  background: string;
  text: string;
  border: string;
  button: string;
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: { background: '#fff', text: '#000', border: '#ccc', button: '#ddd' },
  toggleTheme: () => {},
  isDark: false,
});

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = '@selected_theme';

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (err) {
        console.error('Failed to load theme:', err);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    setIsDark(prev => {
      const newTheme = !prev;
      AsyncStorage.setItem(STORAGE_KEY, newTheme ? 'dark' : 'light').catch(err =>
        console.error('Failed to save theme:', err)
      );
      return newTheme;
    });
  };

  const theme: Theme = isDark
    ? { background: '#111', text: '#fff', border: '#333', button: '#555' }
    : { background: '#fff', text: '#111', border: '#ccc', button: '#ddd' };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
