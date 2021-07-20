import { FunctionComponent } from 'react';
import s from '../../../styles/common/UserNav.module.scss';
import cn from 'classnames';
import { Heart, ShoppingBag } from 'react-feather';
import Link from 'next/link';
import Button from '../../ui/Button';
import UserAvatar from '../UserAvatar';
import I18nWidget from '../I18nWidget';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
}

const UserNav: FunctionComponent<Props> = ({ className }): JSX.Element => {
  // need implements functions

  const itemsCount = 0;
  const loggedIn = false;
  const route = useRouter();
  const { i18n } = useTranslation();

  const handleClick = (url: string) => {
    route.push(url);
  };

  return (
    <>
      <nav className={cn(s.root, className)}>
        <ul className={s.list}>
          <li className={s.item}>
            <div onClick={() => handleClick(`/${i18n.language}/cart`)}>
              <ShoppingBag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </div>
          </li>
          <li className={s.item}>
            <Link href={`/${i18n.language}/wishlist`}>
              <span aria-label="Wishlist">
                <Heart />
              </span>
            </Link>
          </li>
          <li className={s.item}>
            <I18nWidget />
          </li>
          <li className={s.item}>
            {loggedIn ? (
              <UserAvatar />
            ) : (
              <Link href={`/${i18n.language}/auth/login`} passHref>
                <Button variant="ghost" height={42} type="button">
                  Log In
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNav;
