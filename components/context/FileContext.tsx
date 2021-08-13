import { createContext, FunctionComponent, useState } from 'react';

interface IFileContext {
  myFile: any;
  handleFile: (file: any) => void;
}
export const FileContext = createContext<IFileContext>({
  myFile: null,
  handleFile: (file: any) => console.warn(file),
});

const FileProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [myFile, setMyFile] = useState<any>(null);

  const handleFile = (file: any) => {
    setMyFile(file);
  };

  return (
    <FileContext.Provider value={{ myFile, handleFile }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
