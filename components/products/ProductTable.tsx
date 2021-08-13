import ProductTableItem from './ProductTableItem';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../firebase/ProductServices';
import { FunctionComponent } from 'react';
import { IProductTable, Product } from '../../interfaces/product';
import { useTranslation } from 'react-i18next';
import { generateProduct } from '../../utils/generateProduct';
import Button from '../ui/Button';
import { useRouter } from 'next/router';

const ProductTable: FunctionComponent<IProductTable> = ({
  value,
}): JSX.Element => {
  const products: Product[] = [];
  const { i18n, t } = useTranslation();
  const route = useRouter();
  const header = [t('product'), t('price'), t('product_slug')];

  const handleCreate = () => {
    route.push(`/${i18n.language}/admin/product/create`);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: t('are_you_sure'),
      text: t('no_revert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: t('delete_it'),
      cancelButtonText: t('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then(() => {
            Swal.fire(t('delete'), t('deleted'), 'success');
          })
          .catch(() => {
            Swal.fire(t('error'), t('no_deleted'), 'error');
          });
      }
    });
  };

  const renderProducts = () => {
    value?.docs.map((doc: any) => {
      const product: Product = generateProduct(doc);
      products.push(product);
      return null;
    });
  };

  renderProducts();

  return (
    <div className="flex flex-col mt-40">
      <Button className="mb-2 mt-2" onClick={handleCreate}>
        {`${t('create')} ${t('product')}`}{' '}
      </Button>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border border-accent-9 rounded-lg shadow-lg">
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

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-accent-0 uppercase tracking-wider"
                  >
                    <span className="px-6 py-3 sr-only text-accent-0">
                      Options
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-accent-1 divide-y divide-accent-9">
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
