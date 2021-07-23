import cn from 'classnames';
import s from '../../styles/ui/InputFile.module.scss';
import { FunctionComponent, InputHTMLAttributes } from 'react';
import { useState } from 'react';

export interface InputFileProps {
  className?: string;
  onChange?: (...args: any[]) => any;
}

const InputFile: FunctionComponent<InputFileProps> = (props): JSX.Element => {
  const { className, onChange, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  
  return (
    <div className={s.customInputFile}>
      <input
        type="file"
        onChange={props.onChange}
        id="fichero-tarifas"
        className={s.inputFile}
      />
      <p>Subir fichero...</p>
    </div>
  );
};

export default InputFile;
