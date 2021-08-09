import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Layout from '../components/common/Layout';
import { AuthContextValue, MainInitialProps } from '../interfaces/auth';

const Wishlist = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('home')}>
      <div className={styles.container}>Wishlist page</div>
    </Layout>
  );
};

const namespacesRequired = ['common'];

Wishlist.getInitialProps = (): MainInitialProps => ({
  authContext: {
    value: AuthContextValue.WITH,
    redirectTo: '/',
  },
  namespacesRequired,
});

export default withTranslation('common')(Wishlist);
