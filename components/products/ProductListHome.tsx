import { Product } from './ProductCard';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import HomeAllProductsGrid from '../common/HomeAllProductsGrid';
import LoadingDots from '../ui/LoadingDots';

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
      const { price, name, image, slug, stock, description } = doc.data();

      const product: Product = {
        id: doc.id,
        name: name,
        description: description,
        price: price,
        image: { url: image },
        slug: slug,
        stock: stock,
      };
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
