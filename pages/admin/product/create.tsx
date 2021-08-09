import styles from '../../../styles/Home.module.scss';
import { withTranslation } from '../../../i18n';
import Layout from '../../../components/common/Layout';
import { AuthContextValue, MainInitialProps } from '../../../interfaces/auth';
import FormCreateProduct from '../../../components/products/FormCreateProduct';
import FileProvider from '../../../components/context/FileContext';

const CreateProductPage = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('create')}>
      <div className={styles.container}>
        <FileProvider>
          <FormCreateProduct />
        </FileProvider>
      </div>
    </Layout>
  );
};

const namespacesRequired = ['common'];

CreateProductPage.getInitialProps = (): MainInitialProps => ({
  authContext: {
    value: AuthContextValue.WITH,
    redirectTo: '/',
  },
  namespacesRequired,
});

export default withTranslation('common')(CreateProductPage);
