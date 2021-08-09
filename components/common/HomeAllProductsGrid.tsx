import { FunctionComponent } from 'react';
import Link from 'next/link';
import s from '../../styles/common/HomeAllProductsGrid.module.scss';
import ProductCard from '../products/ProductCard';
import Grid from '../ui/Grid';
import cn from 'classnames';
import { Product } from '../../interfaces/product';

interface Props {
  categories?: any;
  brands?: any;
  products?: Product[];
}

const HomeAllProductsGrid: FunctionComponent<Props> = ({
  categories,
  brands,
  products = [],
}) => {
  return (
    <div className={cn(s.root, 'mx-auto max-w-8xl px-6')}>
      <div>
        {/* className={ s.asideWrapper }
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={'/'}>
                <span>All Categories</span>
              </Link>
            </li>
            {/* categories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accent-8 text-base">
                <Link href={'/'}>
                  <span>{cat.name}</span>
                </Link>
              </li>
            )) }
          </ul>
          <ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={'/'}>
                <span>All Designers</span>
              </Link>
            </li>
            {/* brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accent-8 text-base">
                <Link href={'/'}>
                  <span>{node.name}</span>
                </Link>
              </li>
            )) }
          </ul>
        </div> */}
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default HomeAllProductsGrid;
