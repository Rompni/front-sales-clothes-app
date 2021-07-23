import { FunctionComponent } from 'react';
import s from '../../styles/common/Footer.module.scss';
import cn from 'classnames';
import { IFooter } from '../../interfaces/common';

const Footer: FunctionComponent<IFooter> = ({ className }): JSX.Element => {
  const rootClassName = cn(s.root, className);

  return (
    <footer className={rootClassName}>
      <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 bg-accent-9 text-accent-0 text-sm">
        <div>
          <span>&copy; 2021 Store , Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
