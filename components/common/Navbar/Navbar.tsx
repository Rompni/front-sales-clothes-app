import { FunctionComponent } from 'react';
import s from '../../../styles/common/Navbar.module.scss';
import NavbarRoot from './NavbarRoot';
import Link from 'next/link';
import Container from '../../ui/Container';
import Logo from '../../ui/Logo';
import Searchbar from '../SearchBar';
import UserNav from '../UserNav/UserNav';
import { useTranslation } from 'react-i18next';

interface navLink {
  href: string;
  label: string;
}

/*
interface NavbarProps {
  links?: Link[];
} */

const Navbar: FunctionComponent = (): JSX.Element => {
  const { i18n } = useTranslation();

  // these are provisional
  const links: navLink[] = [
    { href: `/${i18n.language}/all`, label: 'All' },
    { href: `/${i18n.language}/search`, label: 'Search' },
  ];

  return (
    <NavbarRoot>
      <Container>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href={`/${i18n.language}`} passHref>
              <span className={s.logo} aria-label="Logo">
                <Logo />
              </span>
            </Link>
            <nav className={s.navMenu}>
              {links?.map((l) => (
                <Link href={l.href} key={l.href} passHref>
                  <span className={s.link}>{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav />
          </div>
          <div className="flex pb-4 lg:px-6 lg:hidden">
            <Searchbar id="mobile-search" />
          </div>
        </div>
      </Container>
    </NavbarRoot>
  );
};

export default Navbar;
