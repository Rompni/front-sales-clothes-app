import cn from 'classnames';
import s from '../../styles/ui/Radio.module.scss';
import { FunctionComponent, InputHTMLAttributes } from 'react';

export interface RadioProps{
  className?: string;
  onChange?: (...args: any[]) => any;
  text?:string;
}

const Radio: FunctionComponent<RadioProps> = (props): JSX.Element => {
  const { className, onChange, ...rest } = props;

  const rootClassName = cn(s.root, {}, className);
    
  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label className={s.labelRadio} >
      <input
        className={s.inputRadio}
        onChange={handleOnChange}
        type="radio" 
        name="radio"
        {...rest}
      />
      <span className={s.spanRadio}>{props.text}</span>
    </label>
  );
};

export default Radio;
