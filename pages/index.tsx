import styles from '../styles/Home.module.scss';
import { withTranslation } from '../i18n';
import Sample from '../components/Sample';

const Index = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Sample />
    </div>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Index);
