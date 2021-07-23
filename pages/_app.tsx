import '../styles/globals.scss';
import App, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from '../i18n';
import Layout from '../components/common/Layout';
import UserProvider from '../components/context/UserContext';
import { AuthContext, AuthContextValue } from '../interfaces/auth';
import redirectTo from '../utils/redirectTo';
import { parseCookies } from '../utils/auth';
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  let authContext = appProps.pageProps.authContext as
    | AuthContext
    | AuthContextValue
    | undefined;

  if (authContext) {
    const cookies = parseCookies(appContext.ctx.req);
    const { userToken } = cookies;

    authContext =
      typeof authContext === 'object'
        ? authContext
        : {
            value: authContext,
          };

    const lang = cookies['next-i18next'] || 'es';

    if (
      (userToken && authContext.value === AuthContextValue.WITHOUT) ||
      (!userToken && authContext.value === AuthContextValue.WITH)
    ) {
      redirectTo(lang + authContext.redirectTo || `/${lang}`, {
        res: appContext.ctx.res,
      });
    }
  }

  return { ...appProps };
};

export default appWithTranslation(MyApp);
