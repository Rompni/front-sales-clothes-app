export const isInDOM = (obj: any) => {
  return Boolean(obj.closest('body'));
};
