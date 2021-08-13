import { FunctionComponent } from 'react';
import s from '../../styles/common/Footer.module.scss';
import cn from 'classnames';
import { IFooter } from '../../interfaces/common';
import Container from '../ui/Container';
import Link from 'next/link';
import Logo from '../ui/Logo';

const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Admin',
    url: '/admin',
  },
];

const Footer: FunctionComponent<IFooter> = ({ className }): JSX.Element => {
  const rootClassName = cn(s.root, className);

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-10 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" passHref>
              <span className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span>ZUKKA STORE</span>
              </span>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!} passHref>
                    <span className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </span>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-primary text-sm">
            <span className="text-primary">Created by</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
