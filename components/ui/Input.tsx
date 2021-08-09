import cn from 'classnames';
import s from '../../styles/ui/Input.module.scss';
import { FunctionComponent } from 'react';
import { IInputProps } from '../../interfaces/ui';

const Input: FunctionComponent<IInputProps> = (props): JSX.Element => {
  const { className, onChange, ownRef, ...rest } = props;

  const rootClassName = cn(s.root, {}, className);

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
        {...ownRef}
      />
    </label>
  );
};

export default Input;
