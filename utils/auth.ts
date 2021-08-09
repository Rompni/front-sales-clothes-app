import cookie from 'cookie';

export const logoutUser = (): void => {
  if (document) {
    document.cookie =
      'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    document.cookie = 'rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.href = '/';
  }
};

export function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  );
}
