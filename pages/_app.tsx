import '../styles/globals.scss';
import "../styles/Login/Estilos.css";
import App, { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from '../i18n';
import Head from '../components/common/Head';
import Layout from '../components/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
