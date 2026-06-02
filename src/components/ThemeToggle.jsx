import React, { useEffect, useState } from 'react';
import { defaultUiContent } from '../content/siteContent';
import { useLocalizedContent } from '../content/locale';

const THEME_STORAGE_KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const ui = useLocalizedContent('ui', defaultUiContent);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    try {
      if (theme === 'light') {
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors and keep the in-memory theme.
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? ui.switchToLightTheme : ui.switchToDarkTheme}
      aria-pressed={!isDark}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-label">
        {isDark ? ui.themeLightLabel : ui.themeDarkLabel}
      </span>
    </button>
  );
}
