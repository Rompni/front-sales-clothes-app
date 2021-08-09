import cn from 'classnames';
import {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
  FunctionComponent,
} from 'react';
import mergeRefs from 'react-merge-refs';
import s from '../../styles/ui/Button.module.scss';
import LoadingDots from './LoadingDots';
import { IButtonProps } from '../../interfaces/ui';

const Button: FunctionComponent<IButtonProps> = forwardRef(
  (props, buttonRef) => {
    const {
      className,
      variant = 'flat',
      children,
      active,
      width,
      height,
      loading = false,
      disabled = false,
      style = {},
      Component = 'button',
      ...rest
    } = props;
    const ref = useRef<typeof Component>(null);

    const rootClassName = cn(
      s.root,
      {
        [s.ghost]: variant === 'ghost',
        [s.slim]: variant === 'slim',
        [s.loading]: loading,
        [s.disabled]: disabled,
      },
      className
    );

    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs([ref, buttonRef])}
        className={rootClassName}
        disabled={disabled}
        style={{
          width,
          height,
          ...style,
        }}
        {...rest}
      >
        {children}
        {loading && (
          <i className="pl-2 m-0 flex">
            <LoadingDots />
          </i>
        )}
      </Component>
    );
  }
);

export default Button;
