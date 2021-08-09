import Button from '../ui/Button';
import { Check } from 'react-feather';
import { IButtonProps } from '../../interfaces/ui';
import { FunctionComponent, memo } from 'react';
import cn from 'classnames';
import s from '../../styles/products/Swatch.module.scss';
import { isDark } from '../../utils/colors';
interface SwatchProps {
  active?: boolean;
  children?: any;
  className?: string;
  variant?: 'size' | 'color' | string;
  color?: string;
  label?: string | null;
}

const Swatch: FunctionComponent<Omit<IButtonProps, 'variant'> & SwatchProps> =
  memo(
    ({
      active,
      className,
      color = '',
      label = null,
      variant = 'size',
      ...props
    }) => {
      variant = variant?.toLowerCase();

      if (label) {
        label = label?.toLowerCase();
      }

      const swatchClassName = cn(
        s.swatch,
        {
          [s.color]: color,
          [s.active]: active,
          [s.size]: variant === 'size',
          [s.dark]: color ? isDark(color) : false,
          [s.textLabel]: !color && label && label.length > 3,
        },
        className
      );

      return (
        <Button
          aria-label="Variant Swatch"
          className={swatchClassName}
          {...(label && color && { title: label })}
          style={color ? { backgroundColor: color } : {}}
          {...props}
        >
          {color && active && (
            <span>
              <Check />
            </span>
          )}
          {!color ? label : null}
        </Button>
      );
    }
  );

export default Swatch;
