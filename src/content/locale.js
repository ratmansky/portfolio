import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LOCALE_STORAGE_KEY = 'portfolio-locale';
const localContentModules = import.meta.glob('../local-content/*.js', { eager: true });

const LocaleContext = createContext({
  locale: 'en',
  setLocale: () => {},
  canUseRussian: false,
  hasRussianContent: false,
  localContent: {},
});

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeLocalizedContent(baseValue, overrideValue) {
  if (overrideValue === undefined) {
    return baseValue;
  }

  if (Array.isArray(baseValue) || Array.isArray(overrideValue)) {
    return overrideValue;
  }

  if (isObject(baseValue) && isObject(overrideValue)) {
    const merged = { ...baseValue };

    Object.keys(overrideValue).forEach((key) => {
      merged[key] = mergeLocalizedContent(baseValue?.[key], overrideValue[key]);
    });

    return merged;
  }

  return overrideValue;
}

function getLocalContent() {
  const modules = Object.values(localContentModules);

  if (!modules.length) {
    return {};
  }

  return modules.reduce((acc, mod) => ({ ...acc, ...(mod.default ?? {}) }), {});
}

function canUseLocalRussian() {
  if (typeof window === 'undefined') {
    return false;
  }

  const { hostname } = window.location;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

function getInitialLocale(canUseRussianFlag, hasRussianContent) {
  if (!canUseRussianFlag || !hasRussianContent || typeof window === 'undefined') {
    return 'en';
  }

  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY) === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
}

export function LocaleProvider({ children }) {
  const localContent = useMemo(() => getLocalContent(), []);
  const canUseRussianFlag = canUseLocalRussian();
  const hasRussianContent = Boolean(localContent.ru);
  const canUseRussian = canUseRussianFlag && hasRussianContent;
  const [locale, setLocale] = useState(() => getInitialLocale(canUseRussianFlag, hasRussianContent));

  useEffect(() => {
    if (!canUseRussian && locale !== 'en') {
      setLocale('en');
    }
  }, [canUseRussian, locale]);

  useEffect(() => {
    if (!canUseRussian) {
      return;
    }

    try {
      if (locale === 'ru') {
        localStorage.setItem(LOCALE_STORAGE_KEY, 'ru');
      } else {
        localStorage.removeItem(LOCALE_STORAGE_KEY);
      }
    } catch {
      // Ignore storage issues and keep in-memory locale.
    }
  }, [canUseRussian, locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      canUseRussian,
      hasRussianContent,
      localContent,
    }),
    [canUseRussian, hasRussianContent, locale, localContent],
  );

  return React.createElement(LocaleContext.Provider, { value }, children);
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useLocalizedContent(key, baseContent) {
  const { locale, localContent } = useLocale();
  const localizedOverride = locale === 'ru' ? localContent.ru?.[key] : undefined;

  return useMemo(
    () => mergeLocalizedContent(baseContent, localizedOverride),
    [baseContent, localizedOverride],
  );
}
