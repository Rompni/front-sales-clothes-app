import ProductTableItem from './ProductTableItem';
import { Product } from './ProductCard';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../firebase/ProductServices';
import { FunctionComponent } from 'react';

const header = ['Product Name', 'Price', 'Slug'];

interface IProductTable {
  value: any;
}

const ProductTable: FunctionComponent<IProductTable> = ({
  value,
}): JSX.Element => {
  const products: Product[] = [];

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Your file has not deleted', 'error');
          });
      }
    });
  };

  const renderProducts = () => {
    value?.docs.map((doc: any) => {
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
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-accent-5 rounded-lg">
            <table className="min-w-full divide-y divide-accent-9">
              <thead className="bg-accent-9">
                <tr>
                  {header.map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-accent-0 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product: any, i) => (
                  <tr key={i}>
                    <ProductTableItem
                      handleDelete={handleDelete}
                      {...product}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
