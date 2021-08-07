import { isInDOM } from './isInDom';

export const hasParent = (element: any, root: any) => {
  return root && root.contains(element) && isInDOM(element);
};
