import { FunctionComponent, useEffect, useState } from 'react';
import s from '../../styles/products/ProductView.module.scss';
import Container from '../ui/Container';
import cn from 'classnames';
import ProductTag from './ProductTag';
import WishlistButton from '../common/WishlistButton';
import Text from '../ui/Text';
import { NextSeo } from 'next-seo';
import { Product } from '../../interfaces/product';
import Image from 'next/Image';
import ProductSidebar from './ProductSidebar';
import ProductCard from './ProductCard';
import { getProductByNotSlug } from '../../firebase/ProductServices';
import { generateProduct } from '../../utils/generateProduct';

const ProductView: FunctionComponent<Product> = (
  { name, price, id, image, description, slug },
  product
): JSX.Element => {
  const [relatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductByNotSlug(slug)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const product: Product = generateProduct(doc);
          relatedProducts.push(product);
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);
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
                  placeholder={'blur'}
                  blurDataURL="/product-img-placeholder.svg"
                  width={600}
                  height={600}
                  quality="85"
                />
              </div>
            </div>
            <WishlistButton className={s.wishlistButton} productId={id} />
          </div>

          {<ProductSidebar product={product} className={s.sidebar} />}
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">
            Related Products {relatedProducts.length}{' '}
          </Text>
          {error && <p>{error}</p>}
          {!loading && (
            <div className={s.relatedProductsGrid}>
              {relatedProducts.map((p, i) => (
                <div
                  key={i}
                  className="animated fadeIn bg-accent-0 border border-accent-2"
                >
                  <ProductCard
                    noNameTag
                    product={p}
                    key={p.name}
                    variant="simple"
                    className="animated fadeIn"
                    imgProps={{
                      width: 300,
                      height: 300,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
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
