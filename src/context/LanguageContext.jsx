import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ru } from '../i18n/ru';
import { en } from '../i18n/en';

const LanguageContext = createContext();

const translations = {
  RU: ru,
  EN: en,
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('RU');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && (savedLang === 'RU' || savedLang === 'EN')) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_language', newLang);
  };

  const t = useCallback((path) => {
    const keys = path.split('.');
    let result = translations[lang];
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }
    
    return result;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
