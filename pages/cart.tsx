import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Layout from '../components/common/Layout';

const Cart = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('cart')}>
      <div className={styles.container}>Cart page</div>
    </Layout>
  );
};

Cart.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Cart);
