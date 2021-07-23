import s from '../../styles/products/InputFileUpload.module.scss';
import { FunctionComponent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

export interface InputFileProps {
  className?: string;
  onChange?: (...args: any[]) => any;
  ownRef?: UseFormRegisterReturn;
}

const InputFileUpload: FunctionComponent<InputFileProps> = (
  props
): JSX.Element => {
  const { className, onChange, ownRef, ...rest } = props;

  const rootClassName = cn(s.inputFile, {}, className);

  return (
    <div className={s.customInputFile}>
      <input
        type="file"
        onChange={onChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={rootClassName}
        {...rest}
        {...ownRef}
      />
      <p>Upload File...</p>
    </div>
  );
};

export default InputFileUpload;
