import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import LoadingDots from '../ui/LoadingDots';
import ProductTable from './ProductTable';
import { FunctionComponent } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ProductListAdmin: FunctionComponent = () => {
  const database = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_NAME || '';

  const [value, loading, error] = useCollection(
    firebase.firestore().collection(database),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <LoadingDots />}
      {value && (
        <PerfectScrollbar>
          <ProductTable value={value} />
        </PerfectScrollbar>
      )}
    </>
  );
};

export default ProductListAdmin;
