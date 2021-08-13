import { FunctionComponent } from 'react';
import s from '../../styles/common/HomeAllProductsGrid.module.scss';
import ProductCard from '../products/ProductCard';
import Grid from '../ui/Grid';
import cn from 'classnames';
import { Product } from '../../interfaces/product';
import Text from '../ui/Text';

interface Props {
  categories?: any;
  brands?: any;
  products?: Product[];
}

const HomeAllProductsGrid: FunctionComponent<Props> = ({ products = [] }) => {
  return (
    <div className={cn(s.root, 'mx-auto max-w-8xl px-6')}>
      <div className="flex-1">
        <Text className=" text-accent-9 text-center" variant="heading">
          ZUKKA STORE
        </Text>
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
