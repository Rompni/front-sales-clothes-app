import { useEffect, useState } from 'react';

import { getRandomPairOfColors } from '../colors';

export const useUserAvatar = (name = 'userAvatar') => {
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    if (!userAvatar && localStorage.getItem(name)) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(localStorage.getItem(name) || 'User');
    }
    if (!localStorage.getItem(name)) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
      localStorage.setItem(name, value);
      setUserAvatar(value);
    }
  }, []);

  return {
    userAvatar,
    setUserAvatar,
  };
};
