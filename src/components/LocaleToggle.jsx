import React from 'react';
import { defaultUiContent } from '../content/siteContent';
import { useLocale, useLocalizedContent } from '../content/locale';

export default function LocaleToggle() {
  const ui = useLocalizedContent('ui', defaultUiContent);
  const { locale, setLocale, canUseRussian } = useLocale();

  if (!canUseRussian) {
    return null;
  }

  return (
    <div
      className="locale-toggle"
      role="group"
      aria-label={ui.localeToggleAria}
    >
      <button
        type="button"
        className="locale-toggle-button"
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        {ui.localeEnglishLabel}
      </button>
      <button
        type="button"
        className="locale-toggle-button"
        aria-pressed={locale === 'ru'}
        onClick={() => setLocale('ru')}
      >
        {ui.localeRussianLabel}
      </button>
    </div>
  );
}
