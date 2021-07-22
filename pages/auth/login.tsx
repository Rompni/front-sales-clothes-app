import styles from '../../styles/Home.module.scss';
import { withTranslation } from '../../i18n';
import LoginForm from '../../components/auth/LoginForm';

const Login = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Login);
