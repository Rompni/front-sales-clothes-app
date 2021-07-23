import {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
  ReactNode,
  ComponentType,
  ReactElement,
} from 'react';
import cn from 'classnames';
import s from '../../styles/ui/Text.module.scss';

type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading';

interface TextProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | any;
  html?: string;
  onClick?: () => any;
}

const Text: FunctionComponent<TextProps> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
  onClick,
}) => {
  const componentsMap: {
    [P in Variant]: ComponentType<any> | string;
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
  };

  const Component:
    | JSXElementConstructor<any>
    | ReactElement<any>
    | ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading',
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Text;
