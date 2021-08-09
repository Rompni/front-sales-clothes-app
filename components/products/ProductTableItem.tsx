import { FunctionComponent } from 'react';
import Image from 'next/Image';
import { IProductTableItem } from '../../interfaces/product';

const ProductTableItem: FunctionComponent<IProductTableItem> = ({
  name,
  slug,
  price,
  image,
  handleDelete,
  id,
}): JSX.Element => {
  const placeholderImg = '/product-img-placeholder.svg';
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
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
            <div className="text-sm font-medium text-gray-900">{name}</div>
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
          className="text-accent-9 hover:text-accent-4 cursor-pointer"
          onClick={() => handleDelete(id || '')}
        >
          Remove
        </span>
      </td>
    </>
  );
};

export default ProductTableItem;
