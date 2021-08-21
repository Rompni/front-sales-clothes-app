import { FunctionComponent } from 'react';
import s from '../../styles/products/ProductView.module.scss';
import Container from '../ui/Container';
import cn from 'classnames';
import ProductTag from './ProductTag';
import WishlistButton from '../common/WishlistButton';

import { NextSeo } from 'next-seo';
import { Product } from '../../interfaces/product';
import Image from 'next/image';
import ProductSidebar from './ProductSidebar';

import { useTranslation } from 'react-i18next';

import Link from 'next/link';

const ProductView: FunctionComponent<Product> = (
  { name, price, id, image, description, slug },
  product
): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag name={name} price={`${price}`} fontSize={32} />
            <div className={s.sliderContainer}>
              <div key={slug} className={s.imageContainer}>
                <Image
                  className={s.img}
                  src={image.url}
                  alt={image.alt || 'Product Image'}
                  width={600}
                  height={600}
                  quality="85"
                />
              </div>
            </div>
            <WishlistButton className={s.wishlistButton} productId={id} />
            <div className={'bg-accent-9 px-6 py-3 text-accent-0'}>
              <Link href={`/${i18n.language}`} passHref>
                <strong className={'cursor-pointer hover:text-accent-6'}>
                  {t('back_list')}
                </strong>
              </Link>
            </div>
          </div>

          {product && (
            <ProductSidebar description={description} className={s.sidebar} />
          )}
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10" />
      </Container>
      <NextSeo
        title={name}
        description={description}
        openGraph={{
          type: 'website',
          title: name,
          description: description,
          images: [
            {
              url: image.url!,
              width: 800,
              height: 600,
              alt: name,
            },
          ],
        }}
      />
    </>
  );
};

export default ProductView;
