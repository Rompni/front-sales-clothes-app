import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const Sample: FunctionComponent = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-10 w-10 rounded-full" />
      {t('hello')}
    </>
  );
};

export default Sample;
