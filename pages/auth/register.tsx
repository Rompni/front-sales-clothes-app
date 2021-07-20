import styles from '../../styles/Home.module.scss';
import { withTranslation } from '../../i18n';

const Register = (): JSX.Element => {
  return <div className={styles.container}>Register Page</div>;
};

Register.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Register);
