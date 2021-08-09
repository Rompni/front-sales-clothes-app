import styles from '../../styles/Home.module.scss';
import { withTranslation } from '../../i18n';
import RegisterForm from '../../components/auth/RegisterForm';
import { AuthContextValue, MainInitialProps } from '../../interfaces/auth';
import Layout from '../../components/common/Layout';

const Register = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('register')}>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </Layout>
  );
};

Register.getInitialProps = (): MainInitialProps => ({
  authContext: AuthContextValue.WITHOUT,
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Register);
