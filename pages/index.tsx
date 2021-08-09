import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Layout from '../components/common/Layout';
import ProductListHome from '../components/products/ProductListHome';

const Index = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('home')} footer={false}>
      <div className={styles.container2}>
        <ProductListHome />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Index);
