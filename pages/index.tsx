import styles from '../styles/Home.module.css';
import Sample from '../components/Sample';
import { withTranslation } from '../i18n';

const IndexPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Sample />
    </div>
  );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(IndexPage);
