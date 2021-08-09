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
import { useTheme } from 'next-themes';
import ClickOutside from '../../../lib/click-outside/ClickOutside';
import s from '../../../styles/common/DropdownMenu.module.scss';
import Link from 'next/link';
import cn from 'classnames';
import { Moon, Sun } from 'react-feather';
import firebase from '../../../firebase/config';
import { logoutUser } from '../../../utils/auth';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../lib/RenderIcon';
import Avatar from '../Avatar';

interface DropdownMenuProps {
  open?: boolean;
}

const LINKS = [
  {
    name: 'My Orders',
    href: '/orders',
  },
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'My Cart',
    href: '/cart',
  },
];

const DropdownMenu: FunctionComponent<DropdownMenuProps> = () => {
  const { pathname } = useRouter();
  const { theme, setTheme } = useTheme();
  const [display, setDisplay] = useState(false);
  // const { closeSidebarIfPresent } = useUI();
  const { i18n } = useTranslation();
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
            {LINKS.map(({ name, href }) => (
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
            ))}
            <li>
              <span
                className={cn(s.link, 'justify-between')}
                onClick={() => {
                  theme === 'dark' ? setTheme('light') : setTheme('dark');
                  setDisplay(false);
                }}
              >
                <div>
                  Theme: <strong>{theme}</strong>{' '}
                </div>
                <div className="ml-3">
                  {theme === 'dark' ? (
                    <Moon width={20} height={20} />
                  ) : (
                    <Sun width="20" height={20} />
                  )}
                </div>
              </span>
            </li>
            <li>
              <span
                className={cn(s.link, 'border-t border-accent-2 mt-4')}
                onClick={() => logout()}
              >
                Logout
              </span>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownMenu;
