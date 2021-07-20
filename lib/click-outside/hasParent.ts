import isInDOM from './isInDom';

const hasParent = (element: any, root: any) =>
  root && root.contains(element) && isInDOM(element);

export default hasParent;
