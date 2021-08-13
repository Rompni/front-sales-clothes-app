import { FunctionComponent, useState } from 'react';
import s from '../../styles/products/ProductSidebar.module.scss';
import { ProductSidebarProps } from '../../interfaces/product';
import Text from '../ui/Text';
import Button from '../ui/Button';
import Rating from '../ui/Rating';
import Collapse from '../ui/Collapse';
import { useTranslation } from 'react-i18next';

const ProductSidebar: FunctionComponent<ProductSidebarProps> = ({
  description,
  className,
}) => {
  const [loading] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">
          36 {t('reviews')}
        </div>
      </div>
      <div>
        <Button
          aria-label="Add to Cart"
          type="button"
          className={s.button}
          // onClick={addToCart}
          loading={loading}
          // disabled={variant?.availableForSale === false}
        >
          {/* variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart' */}
          {t('add_to_card')}
        </Button>
      </div>
      <div className="mt-6">
        <Collapse title={t('product_description')}>
          <Text className="whitespace-pre-line">{description}</Text>
        </Collapse>
        <Collapse title={t('product_details')}>{t('product_details')}</Collapse>
      </div>
    </div>
  );
};

export default ProductSidebar;
