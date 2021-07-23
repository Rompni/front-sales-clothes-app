import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Sample from '../components/Sample';
import Layout from '../components/common/Layout';
import ProductList from '../components/products/ProductList';

const Index = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('home')} footer={false}>
      <div className={styles.container2}>
        <ProductList />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Index);
