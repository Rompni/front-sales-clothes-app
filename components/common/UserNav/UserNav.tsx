import { FunctionComponent } from 'react';
import s from '../../../styles/common/UserNav.module.scss';
import cn from 'classnames';
import { Globe, Heart, ShoppingBag } from 'react-feather';
import Link from 'next/link';

interface Props {
  className?: string;
}

const UserNav: FunctionComponent<Props> = ({ className }): JSX.Element => {
  // need implements functions
  const toggleSidebar = () => {};
  const closeSidebarIfPresent = () => {};
  const itemsCount = 0;

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item} onClick={toggleSidebar}>
          <ShoppingBag />
          {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
        </li>
        <li className={s.item}>
          <Link href="/wishlist">
            <span onClick={closeSidebarIfPresent} aria-label="Wishlist">
              <Heart />
            </span>
          </Link>
        </li>
        <li className={s.item}>
          <span>
            <Globe />
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
