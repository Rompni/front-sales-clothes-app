import Image, { ImageProps } from 'next/Image';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from '../../styles/products/ProductCard.module.scss';
import ProductTag from './ProductTag';

export type ProductImage = {
  url: string;
  alt?: string;
};

export type Stock = {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  value: number;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  slug: string;
  image: ProductImage;
  price: string;
  stock?: Stock[];
};

interface IProductCardProps {
  className?: string;
  product: Product;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>;
  variant?: 'default' | 'slim' | 'simple';
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard: FunctionComponent<IProductCardProps> = ({
  variant,
  className,
  imgProps,
  noNameTag,
  product,
  ...props
}): JSX.Element => {
  const { price } = product;

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  );

  return (
    <Link href={`/product/${product.slug}`} {...props} passHref>
      <span className={rootClassName}>
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.name}</span>
            </div>
            {product.image && (
              <Image
                quality="85"
                src={placeholderImg || product.image.url}
                alt={product.name || 'Product Image'}
                height={320}
                width={320}
                layout="fixed"
                {...imgProps}
              />
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>{`${price} USD`}</div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product.image && (
                <Image
                  alt={product.name || 'Product Image'}
                  className={s.productImage}
                  src={product.image.url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            <span>s</span>
            <ProductTag name={product.name} price={`${price} USD`} />
            <div className={s.imageContainer}>
              {product.image && (
                <Image
                  alt={product.name || 'Product Image'}
                  className={s.productImage}
                  src={product.image?.url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              )}
            </div>
          </>
        )}
      </span>
    </Link>
  );
};

export default ProductCard;
