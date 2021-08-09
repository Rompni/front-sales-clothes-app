import { ButtonHTMLAttributes, FunctionComponent, useState } from 'react';
import s from '../../styles/wishlist/WishlistButton.module.scss';
import cn from 'classnames';
import { Heart } from 'react-feather';

type IWishlistButton = {
  productId?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const WishlistButton: FunctionComponent<IWishlistButton> = ({
  className,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const itemInWishlist = false;
  /* const { data } = useWishlist();
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const { data: customer } = useCustomer();
  const { openModal, setModalView } = useUI();



  // @ts-ignore Wishlist is not always enabled
  const itemInWishlist = data?.items?.find(
    // @ts-ignore Wishlist is not always enabled
    (item) =>
      item.product_id === Number(productId) &&
      (item.variant_id as any) === Number(variant.id)
  );

   */

  const handleWishlistChange = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    // A login is required before adding an item to the wishlist
    /* if (!customer) {
      setModalView('LOGIN_VIEW');
      return openModal();
    } */

    setLoading(true);

    try {
      /*
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! });
      } else {
        await addItem({
          productId,
          variantId: variant?.id!,
        });
      }


 */
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <button
      aria-label="Add to wishlist"
      className={cn(s.root, className)}
      onClick={handleWishlistChange}
    >
      <Heart
        className={cn(s.icon, {
          [s.loading]: loading,
          [s.inWishlist]: itemInWishlist,
        })}
      />
    </button>
  );
};

export default WishlistButton;
