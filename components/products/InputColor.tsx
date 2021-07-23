import cn from 'classnames';
import s from '../../styles/ui/InputColor.module.scss';
import { FunctionComponent, InputHTMLAttributes } from 'react';
import { ValueSource } from 'react-avatar';

export interface InputColorProps {
  className?: string;
  onChange?: (...args: any[]) => any;
  value?:string;
  disabled?:boolean;
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
      <input type="color" className={s.inputColor} value={props.value} onChange={props.onChange}/>
      <br></br>
      <input disabled type="text" value={props.value} onChange={props.onChange}/>
    </label>
  );
};

export default InputColor;
