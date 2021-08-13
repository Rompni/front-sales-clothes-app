export interface navLink {
  href: string;
  label: string;
}

export interface IUserNav {
  className?: string;
}

export interface IFooter {
  className?: string;
  children?: any;
}

export interface IModalCart {
  isOpen: boolean;
  closeModal: () => any;
}

export interface ISearchBar {
  className?: string;
  id?: string;
  text: string;
}
