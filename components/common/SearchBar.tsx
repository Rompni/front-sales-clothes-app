import s from '../../styles/common/SearchBar.module.scss';
import { FunctionComponent, useEffect, KeyboardEvent, useMemo } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Search } from 'react-feather';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
  id?: string;
}

const Searchbar: FunctionComponent<Props> = ({ className, id = 'search' }) => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    router.prefetch('/search');
  }, []);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      const q = e.currentTarget.value;

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    const q = router.query.q;

    router.push(
      {
        pathname: `/search`,
        query: q ? { q } : {},
      },
      undefined,
      { shallow: true }
    );
  };

  return useMemo(
    () => (
      <div className={cn(s.root, className)}>
        <label className="hidden" htmlFor={id}>
          Search
        </label>
        <input
          id={id}
          className={s.input}
          placeholder={t('search')}
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