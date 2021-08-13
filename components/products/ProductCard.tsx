import Image from 'next/Image';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import s from '../../styles/products/ProductCard.module.scss';
import { IProductCardProps } from '../../interfaces/product';

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
                  src={product.image.url}
                  height={540}
                  width={540}
                  quality="85"
                  placeholder={'blur'}
                  blurDataURL="/product-img-placeholder.svg"
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
