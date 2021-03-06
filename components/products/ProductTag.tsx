import cn from 'classnames';
import s from '../../styles/products/ProductTag.module.scss';
import { FunctionComponent } from 'react';
import { ProductTagProps } from '../../interfaces/product';

const ProductTag: FunctionComponent<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
}): JSX.Element => {
  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      <div className={s.price}>{price}$ USD</div>
    </div>
  );
};

export default ProductTag;
