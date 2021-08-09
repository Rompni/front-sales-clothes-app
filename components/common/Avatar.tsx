import { FC, FunctionComponent, MutableRefObject, useRef } from 'react';
import { useUserAvatar } from '../../utils/hooks/useUserAvatar';

interface Props {
  className?: string;
  children?: any;
}

const Avatar: FunctionComponent<Props> = () => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const { userAvatar } = useUserAvatar();

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar }}
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear"
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
