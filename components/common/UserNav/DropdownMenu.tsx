import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { useRouter } from 'next/router';
import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import ClickOutside from '../../../lib/click-outside/ClickOutside';
import s from '../../../styles/common/DropdownMenu.module.scss';
import cn from 'classnames';
import firebase from '../../../firebase/config';
import { logoutUser } from '../../../utils/auth';
import { useTranslation } from 'react-i18next';
import Avatar from '../Avatar';

interface DropdownMenuProps {
  open?: boolean;
}

const DropdownMenu: FunctionComponent<DropdownMenuProps> = () => {
  const [display, setDisplay] = useState(false);
  // const { closeSidebarIfPresent } = useUI();
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  const logout = async () => {
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

  const admin = () => {
    router.push(`/${i18n.language}/admin/product`);
  };

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [display]);

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={cn(s.avatarButton, 'mt-1 ')}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          <Avatar />
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            {/* LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <span
                      className={cn(s.link, {
                        [s.active]: pathname === href,
                      })}
                      onClick={() => {
                        setDisplay(false);
                        // closeSidebarIfPresent();
                      }}
                    >
                      {name}
                    </span>
                  </Link>
                </div>
              </li>
            )) */}

            <li>
              <span
                className={cn(s.link, 'justify-between')}
                onClick={() => admin()}
              >
                {t('admin')}
              </span>
            </li>
            <li>
              <span
                className={cn(s.link, 'border-t border-accent-2 mt-4')}
                onClick={() => logout()}
              >
                {t('Logout')}
              </span>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownMenu;
