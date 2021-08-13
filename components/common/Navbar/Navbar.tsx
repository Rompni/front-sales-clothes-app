import { FunctionComponent } from 'react';
import s from '../../../styles/common/Navbar.module.scss';
import NavbarRoot from './NavbarRoot';
import Link from 'next/link';
import Container from '../../ui/Container';
import Logo from '../../ui/Logo';
import Searchbar from '../SearchBar';
import UserNav from '../UserNav/UserNav';
import { useTranslation } from 'react-i18next';
// import { navLink } from '../../../interfaces/common';

/*
interface NavbarProps {
  links?: Link[];
} */

const Navbar: FunctionComponent = (): JSX.Element => {
  const { i18n, t } = useTranslation();

  /* these are provisional
  const links: navLink[] = [
    { href: `/${i18n.language}`, label: 'All' },
    { href: `/${i18n.language}/search`, label: 'Search' },
  ]; */

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
            {/*  <nav className={s.navMenu}>
              {links?.map((l) => (
                <Link href={l.href} key={l.href} passHref>
                  <span className={s.link}>{l.label}</span>
                </Link>
              ))}
            </nav> */}
          </div>
          <div className="justify-center flex-1 hidden lg:flex xl:flex 2xl:flex">
            <Searchbar text={t('search')} />
          </div>
          <div className="flex items-center ml-3 mr-3 justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>
        <div className="flex pb-4 md:px-6 lg:hidden xl:hidden 2xl:hidden">
          <Searchbar id="mobile-search" text={t('search')} />
        </div>
      </Container>
    </NavbarRoot>
  );
};

export default Navbar;
