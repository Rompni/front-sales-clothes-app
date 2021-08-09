import styles from '../../../styles/Home.module.scss';
import { withTranslation } from '../../../i18n';
import Layout from '../../../components/common/Layout';
import { AuthContextValue, MainInitialProps } from '../../../interfaces/auth';
import ProductListAdmin from '../../../components/products/ProductListAdmin';

const IndexProductPage = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('create')}>
      <div className={styles.container}>
        <ProductListAdmin />
      </div>
    </Layout>
  );
};

const namespacesRequired = ['common'];

IndexProductPage.getInitialProps = (): MainInitialProps => ({
  authContext: {
    value: AuthContextValue.WITH,
    redirectTo: '/',
  },
  namespacesRequired,
});

export default withTranslation('common')(IndexProductPage);
