import { useEffect, useState } from 'react';
import { withTranslation } from '../../i18n';
import Layout from '../../components/common/Layout';
import { useRouter } from 'next/router';
import LoadingDots from '../../components/ui/LoadingDots';
import { getProductBySlug } from '../../firebase/ProductServices';
import ProductView from '../../components/products/ProductView';
import { generateProduct } from '../../utils/generateProduct';
import { Product } from '../../interfaces/product';

const ProductPage = ({ t }: any): JSX.Element => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    getProductBySlug(slug)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setLoading(false);
          setProduct(generateProduct(doc));
        });
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  return (
    <Layout title={t('home')} footer={false}>
      {error && <strong>Error getting documents: {error}</strong>}
      {loading && <LoadingDots />}
      {product && <ProductView {...product} />}
    </Layout>
  );
};

ProductPage.getInitialProps = () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(ProductPage);
