import { FunctionComponent, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import s from '../../styles/ui/Input.module.scss';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  ownRef?: UseFormRegisterReturn;
}

const InputTextArea: FunctionComponent<ITextAreaProps> = ({
  className,
  onChange,
  ownRef,
  ...rest
}): JSX.Element => {
  const rootClassName = cn(s.root, s.myTextArea, className);

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <label>
      <textarea
        className={rootClassName}
        onChange={handleOnChange}
        {...rest}
        {...ownRef}
      />
    </label>
  );
};

export default InputTextArea;
