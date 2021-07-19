import cn from 'classnames';
import { ComponentType, FunctionComponent, HTMLAttributes } from 'react';

interface ContainerProps {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: FunctionComponent<ContainerProps> = ({
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
