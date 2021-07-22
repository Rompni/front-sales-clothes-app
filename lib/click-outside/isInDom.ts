const isInDom = (obj: any) => {
  return Boolean(obj.closest('body'));
};

export default isInDom;
