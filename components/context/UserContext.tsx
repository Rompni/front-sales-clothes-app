import { createContext, FunctionComponent, useEffect, useState } from 'react';
import { ContextProps, ILocal } from '../../interfaces/context';
import firebase from '../../firebase/config';

export const defaultLocale = 'es';
export const locales: ILocal[] = [
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

const InitialContext: ContextProps = {
  locale: 'es',
  user: '',
  setLocale: (lang) => ({}),
};

export const UserContext = createContext<ContextProps>(InitialContext);

UserContext.displayName = 'UserContext';

const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [locale, setLocale] = useState('es');
  const [user, setUser] = useState<any>('');

  // CHANGE LANGUAGE
  useEffect(() => {
    if (!window) {
      return;
    }
    // Captures the language information saved by the Header component
    const language = localStorage.getItem('lang') || locale;
    setLocale(language);
  }, [locale]);

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) setUser(authUser.email);
        else setUser('');
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, locale, setLocale }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
