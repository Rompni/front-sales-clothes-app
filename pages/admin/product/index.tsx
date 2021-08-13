import styles from '../../../styles/Home.module.scss';
import { withTranslation } from '../../../i18n';
import Layout from '../../../components/common/Layout';
import { AuthContextValue, MainInitialProps } from '../../../interfaces/auth';
import ProductListAdmin from '../../../components/products/ProductListAdmin';
import cn from 'classnames';

const IndexProductPage = (): JSX.Element => {
  return (
    <Layout title={`Admin`} footer={false}>
      <div className={cn(styles.container)}>
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
