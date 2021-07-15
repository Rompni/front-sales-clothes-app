import '../styles/globals.css';
import App, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from '../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
