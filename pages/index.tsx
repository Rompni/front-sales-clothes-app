import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Sample from '../components/Sample';
import Layout from '../components/common/Layout';

const Index = ({ t }: any): JSX.Element => {
  return (
    <Layout title={t('home')}>
      <div className={styles.container}>
        <Sample />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Index);
