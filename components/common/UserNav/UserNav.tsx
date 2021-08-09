import { FunctionComponent } from 'react';
import s from '../../../styles/common/UserNav.module.scss';
import cn from 'classnames';
import { Heart, ShoppingBag } from 'react-feather';
import Link from 'next/link';

import I18nWidget from '../I18nWidget';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IUserNav } from '../../../interfaces/common';
import { useUserAuth } from '../../../utils/hooks/useUserAuth';
import { useWindowSize } from '../../../utils/hooks/useWindowSize';
import DropdownMenu from './DropdownMenu';
import { Icon } from '../../../lib/RenderIcon';

const UserNav: FunctionComponent<IUserNav> = ({ className }): JSX.Element => {
  const itemsCount = 0;
  const router = useRouter();
  const { isAuth } = useUserAuth();
  const { i18n } = useTranslation();
  const { width } = useWindowSize();

  const handleClick = (url: string) => {
    router.push(url);
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
            {isAuth ? (
              <DropdownMenu />
            ) : (
              <>
                <div
                  onClick={() => router.push(`/${i18n.language}/auth/login`)}
                >
                  <Icon name="LogIn" />
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNav;
