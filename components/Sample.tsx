import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
      <button onClick={handleLang}>{t('change')}</button>
      {t('hello')}
    </>
  );
};

export default Sample;
