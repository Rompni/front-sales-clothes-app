import s from '../../styles/products/InputFileUpload.module.scss';
import { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import cn from 'classnames';
import Swal from 'sweetalert2';
import LoadingDots from '../ui/LoadingDots';
import { FileContext } from '../context/FileContext';
import { XSquare } from 'react-feather';
import { InputFileProps } from '../../interfaces/product';

const InputFileUpload: FunctionComponent<InputFileProps> = (
  props
): JSX.Element => {
  const { className, ownRef, ...rest } = props;
  const [isCharged, setIsCharged] = useState(false);
  const [isFile, setIsFile] = useState<any>(null);
  const { handleFile } = useContext(FileContext);

  const rootClassName = cn(s.inputFile, {}, className);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<any>('');
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const file = e.target.files[0];
      if (file) {
        setIsCharged(true);
        setIsLoading(true);
        const extFile = file.type;
        if (
          extFile === 'image/jpg' ||
          extFile === 'image/jpeg' ||
          extFile === 'image/png'
        ) {
          setTimeout(() => {
            setIsFile(file);
            handleFile(file);
            setIsLoading(false);
          }, 1000);
        } else {
          Swal.fire('Upload Error', 'Error, only images', 'error').then(() => {
            setIsFile('');
            handleFile(null);
            setIsCharged(false);
            setIsLoading(false);
            e.target.value = '';
          });
        }
      } else {
        setIsCharged(false);
        setIsFile('');
        handleFile(null);
        e.target.value = '';
      }
    } catch (e) {
      setIsFile('');
      handleFile(null);
      setIsCharged(false);
      setIsLoading(false);
    }
  };

  // NEED FIX
  const handleRemove = () => {
    setIsCharged(false);
    setIsFile('');
    handleFile(null);
    setValue('');
  };

  return (
    <>
      <div className={s.customInputFile}>
        <input
          type="file"
          onChange={handleUpload}
          accept=".jpg,.jpeg,.png"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          title=""
          value={value}
          className={rootClassName}
          {...rest}
          {...ownRef}
        />
        {isLoading && <LoadingDots />}
        {!isCharged && !isLoading && <p>Upload File...</p>}
        {!isLoading && isCharged && isFile && <p>{isFile.name}</p>}
      </div>
      {isCharged && isFile && (
        <XSquare className="cursor-pointer" onClick={handleRemove} />
      )}
    </>
  );
};

export default InputFileUpload;
