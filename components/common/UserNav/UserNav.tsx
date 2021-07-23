import { FunctionComponent } from 'react';
import s from '../../../styles/common/UserNav.module.scss';
import cn from 'classnames';
import { Heart, ShoppingBag } from 'react-feather';
import Link from 'next/link';
import Button from '../../ui/Button';
// import UserAvatar from '../UserAvatar';
import I18nWidget from '../I18nWidget';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IUserNav } from '../../../interfaces/common';
import firebase from '../../../firebase/config';
import { useUserAuth } from '../../../utils/hooks/useUserAuth';
import { logoutUser } from '../../../utils/auth';

const UserNav: FunctionComponent<IUserNav> = ({ className }): JSX.Element => {
  const itemsCount = 0;
  const router = useRouter();
  const { isNotAuth, isAuth } = useUserAuth();
  const { i18n, t } = useTranslation();

  const signOut = async () => {
    if (firebase) {
      try {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            logoutUser();
            router.push(`/${i18n.language}/auth/login`);
          });
        // alert
      } catch (e) {
        console.log(e);
      }
    }
  };

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
            {isAuth && (
              <>
                {/* <UserAvatar name={user} /> */}
                <Link href={`/${i18n.language}/auth/login`} passHref>
                  <Button
                    variant="ghost"
                    height={42}
                    type="button"
                    onClick={signOut}
                  >
                    {t('logout')}
                  </Button>
                </Link>
              </>
            )}

            {isNotAuth && (
              <Link href={`/${i18n.language}/auth/login`} passHref>
                <Button variant="ghost" height={42} type="button">
                  {t('login')}
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
