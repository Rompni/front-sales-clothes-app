import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/config';
import HomeAllProductsGrid from '../common/HomeAllProductsGrid';
import LoadingDots from '../ui/LoadingDots';
import { generateProduct } from '../../utils/generateProduct';
import { Product } from '../../interfaces/product';

const ProductListHome = (): JSX.Element => {
  const db = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_NAME || '';
  const products: Product[] = [];
  const [value, loading, error] = useCollection(
    firebase.firestore().collection(db),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const renderProducts = () => {
    value?.docs.map((doc) => {
      const product: Product = generateProduct(doc);
      products.push(product);
      return null;
    });
  };

  renderProducts();

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <LoadingDots />}
      {value && <HomeAllProductsGrid products={products} />}
    </>
  );
};

export default ProductListHome;
