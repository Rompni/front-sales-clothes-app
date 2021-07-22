import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';

const Search = (): JSX.Element => {
  return <div className={styles.container}>Search page</div>;
};

Search.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Search);
