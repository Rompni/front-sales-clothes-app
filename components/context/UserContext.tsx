import { createContext, FunctionComponent, useEffect, useState } from 'react';

export const defaultLocale = 'es';
export const locales = [
  {
    name: 'es',
    img: {
      filename: 'flag-es-co.svg',
      alt: 'Bandera Colombiana',
    },
  },
  {
    name: 'en',
    img: {
      filename: 'flag-en-us.svg',
      alt: 'US Flag',
    },
  },
];

type ContextProps = {
  locale: string;
  setLocale: (lang: string) => void;
};

const InitialContext: ContextProps = {
  locale: 'es',
  setLocale: (lang) => console.log(''),
};

export const UserContext = createContext<ContextProps>(InitialContext);

UserContext.displayName = 'UserContext';

const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [locale, setLocale] = useState('es');

  useEffect(() => {
    if (!window) {
      return;
    }
    // Captures the language information saved by the Header component
    const language = localStorage.getItem('lang') || locale;
    setLocale(language);
  }, [locale]);
  return (
    <UserContext.Provider value={{ locale, setLocale }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
