import s from '../../styles/common/Layout.module.scss';
import Navbar from './Navbar/Navbar';
import LoadingDots from '../ui/LoadingDots';
import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

const Layout: FunctionComponent = ({ children }): JSX.Element => {
  // const { locale = 'es' } = useRouter();
  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>
    </div>
  );
};

export default Layout;
