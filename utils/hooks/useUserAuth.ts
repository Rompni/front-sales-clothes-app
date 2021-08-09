import { useState, useEffect } from 'react';
import { parseCookies } from '../auth';
import { useUserAuthType } from '../../interfaces/auth';

export function useUserAuth(): useUserAuthType {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookies = parseCookies();
    // console.log('cookies saved');
    setIsLoggedIn(!!cookies.userToken);
    setLoading(false);
  }, []);

  return {
    isAuth: !loading && isLoggedIn,
    isNotAuth: !loading && !isLoggedIn,
    loading,
  };
}
