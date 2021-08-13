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
    let mounted = true;
    getProductBySlug(slug)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (mounted) {
            setLoading(false);
            setProduct(generateProduct(doc));
          }
        });

        return () => (mounted = false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title={product?.name || t('product')} footer={false}>
      {error && <strong>Error getting documents: {error}</strong>}
      {loading && (
        <div className="text-center">
          <LoadingDots />
        </div>
      )}
      {product && <ProductView {...product} />}
    </Layout>
  );
};

ProductPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(ProductPage);
