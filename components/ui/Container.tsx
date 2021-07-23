import cn from 'classnames';
import { ComponentType, FunctionComponent, HTMLAttributes } from 'react';
import { IContainerProps } from '../../interfaces/ui';

const Container: FunctionComponent<IContainerProps> = ({
  children,
  className,
  el = 'div',
  clean,
}): JSX.Element => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  });

  const Component: ComponentType<HTMLAttributes<HTMLDivElement>> = el as any;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
