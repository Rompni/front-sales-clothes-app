import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';

const Wishlist = (): JSX.Element => {
  return <div className={styles.container}>Wishlist page</div>;
};

Wishlist.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Wishlist);
