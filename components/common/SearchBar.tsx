import s from '../../styles/common/SearchBar.module.scss';
import { FunctionComponent, useEffect, KeyboardEvent, useMemo } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Search } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { ISearchBar } from '../../interfaces/common';

const Searchbar: FunctionComponent<ISearchBar> = ({
  className,
  id = 'search',
  text,
}) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    router.prefetch(`${i18n.language}/search`);
  }, []);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      const q = e.currentTarget.value;

      router.push(
        {
          pathname: `${i18n.language}/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return useMemo(
    () => (
      <div className={cn(s.root, className)}>
        <label className="hidden" htmlFor={t('search')}>
          {text}
        </label>
        <input
          id={id}
          className={s.input}
          placeholder={''}
          defaultValue={router.query.q}
          onKeyUp={handleKeyUp}
        />
        <div className={s.iconContainer}>
          <Search className={s.icon} />
        </div>
      </div>
    ),
    []
  );
};

export default Searchbar;
