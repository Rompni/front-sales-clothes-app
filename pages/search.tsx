import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';

const IndexPage = (): JSX.Element => {
  return <div className={styles.container}>Search page</div>;
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(IndexPage);
