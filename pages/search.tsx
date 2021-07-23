import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Layout from '../components/common/Layout';

const Search = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('search')}>
      <div className={styles.container}>Search page</div>
    </Layout>
  );
};

Search.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Search);
