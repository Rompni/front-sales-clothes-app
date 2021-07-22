import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';

const Cart = (): JSX.Element => {
  return <div className={styles.container}>Cart page</div>;
};

Cart.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Cart);
