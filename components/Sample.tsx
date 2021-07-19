import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './common/Navbar/Navbar';

const Sample: FunctionComponent = (): JSX.Element => {
  const [language, setLanguage] = useState('es');
  const { t, i18n } = useTranslation();

  const handleLang = () => {
    if (language === 'es') setLanguage('en');
    else if (language === 'en') setLanguage('es');
    i18n.changeLanguage(language).then();
  };

  return (
    <>
      <button className="" onClick={handleLang}>
        {t('change')}
      </button>
      <div className="h-10 w-10 rounded-full" />
      {t('hello')}
    </>
  );
};

export default Sample;
