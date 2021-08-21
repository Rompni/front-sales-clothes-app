import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { IProductTableItem } from '../../interfaces/product';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Modal from '../ui/Modal';
import FormEditProduct from './FormEditProduct';

const ProductTableItem: FunctionComponent<IProductTableItem> = ({
  name,
  slug,
  price,
  image,
  description,
  handleDelete,

  id,
}): JSX.Element => {
  const placeholderImg = '/product-img-placeholder.svg';
  const { t, i18n } = useTranslation();
  const [displayModal, setDisplayModal] = useState(false);
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap ">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {image && (
              <Image
                className={'h-10 w-10 rounded-full'}
                quality="85"
                src={image.url || placeholderImg}
                alt={name || 'Product Image'}
                height={200}
                width={200}
              />
            )}
          </div>
          <div className="ml-4">
            <Link href={`/${i18n.language}/product/${slug}`}>
              <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-accent-5">
                {name}
              </div>
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{price}</div>
        <div className="text-sm text-gray-500">USD</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {slug}
        </span>
      </td>
      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
        <span
          className="px-3 text-red hover:text-accent-9 cursor-pointer"
          onClick={() => handleDelete(id || '')}
        >
          {t('remove')}
        </span>
        <span
          className="px-3 text-blue hover:text-accent-9 cursor-pointer "
          onClick={() => setDisplayModal(true)}
        >
          {t('edit')}
        </span>
        <>
          {displayModal && (
            <Modal onClose={() => setDisplayModal(false)}>
              <FormEditProduct
                {...{ name, description, slug, image, price, id }}
              />
            </Modal>
          )}
        </>
      </td>
    </>
  );
};

export default ProductTableItem;
