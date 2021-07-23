import styles from '../../styles/Home.module.scss';
import { withTranslation } from '../../i18n';
import LoginForm from '../../components/auth/LoginForm';
import { AuthContextValue, MainInitialProps } from '../../interfaces/auth';
import Layout from '../../components/common/Layout';

const Login = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('login')}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Layout>
  );
};

const namespacesRequired = ['common', 'login'];

Login.getInitialProps = (): MainInitialProps => ({
  authContext: {
    value: AuthContextValue.WITHOUT,
    redirectTo: '/',
  },
  namespacesRequired,
});

export default withTranslation('login')(Login);
