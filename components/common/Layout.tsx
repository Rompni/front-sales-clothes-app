import s from '../../styles/common/Layout.module.scss';
import Navbar from './Navbar/Navbar';
import { FunctionComponent } from 'react';
import cn from 'classnames';
import Footer from './Footer';
import AppHead from './Head';

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
