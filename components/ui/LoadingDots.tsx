import s from '../../styles/ui/LoadingDots.module.scss';
import { FunctionComponent } from 'react';

const LoadingDots: FunctionComponent = (): JSX.Element => {
  return (
    <span className={s.root}>
      <span className={s.dot} key={`dot_1`} />
      <span className={s.dot} key={`dot_2`} />
      <span className={s.dot} key={`dot_3`} />
    </span>
  );
};

export default LoadingDots;
