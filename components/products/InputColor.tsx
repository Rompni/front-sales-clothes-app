import cn from 'classnames';
import s from '../../styles/ui/InputColor.module.scss';
import { FunctionComponent, InputHTMLAttributes } from 'react';

export interface InputColorProps {
  className?: string;
  onChange?: (...args: any[]) => any;
}

const InputColor: FunctionComponent<InputColorProps> = (props): JSX.Element => {
  const { className, onChange, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <input type="color" className={s.inputColor} />
      <br></br>
    </label>
  );
};

export default InputColor;
