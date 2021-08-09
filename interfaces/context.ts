export type ContextProps = {
  locale: string;
  user: string;
  setLocale: (lang: string) => void;
};

export interface ILocal {
  name: string;
  img: {
    filename: string;
    alt: string;
  };
}
