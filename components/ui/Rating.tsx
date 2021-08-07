import { FunctionComponent, memo } from 'react';

import cn from 'classnames';
import { Star } from 'react-feather';
import { rangeMap } from '../../utils/rangeMap';

export interface RatingProps {
  value: number;
}

const Rating: FunctionComponent<RatingProps> = memo(({ value = 5 }) => {
  return (
    <div className="flex flex-row py-6 text-accent-9">
      {rangeMap(5, (i: number) => (
        <span
          key={`star_${i}`}
          className={cn('inline-block ml-1 ', {
            'text-accent-5': i >= Math.floor(value),
          })}
        >
          <Star />
        </span>
      ))}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;
