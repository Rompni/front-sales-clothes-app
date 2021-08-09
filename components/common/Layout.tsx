import s from '../../styles/common/Layout.module.scss';
import Navbar from './Navbar/Navbar';
import LoadingDots from '../ui/LoadingDots';
import { FunctionComponent } from 'react';
import cn from 'classnames';
import Footer from './Footer';
import AppHead from './Head';

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

export type LayoutProps = {
  title?: string;
  footer?: boolean;
};

const Layout: FunctionComponent<LayoutProps> = ({
  title,
  children,
  footer = true,
}): JSX.Element => {
  // const { locale = 'es' } = useRouter();
  return (
    <div className={cn(s.root)}>
      <AppHead title={title} />
      <Navbar />
      <main className={s.fit}>{children}</main>
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
