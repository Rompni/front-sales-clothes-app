import styles from '../../../styles/Home.module.scss';
import { withTranslation } from '../../../i18n';
import Layout from '../../../components/common/Layout';
import { AuthContextValue, MainInitialProps } from '../../../interfaces/auth';
import FormCreateProduct from '../../../components/products/FormCreateProduct';

const Wishlist = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('create')}>
      <div className={styles.container}>
        <FormCreateProduct />
      </div>
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
