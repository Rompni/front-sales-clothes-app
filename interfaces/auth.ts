export interface ISignUpData {
  name?: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export enum AuthContextValue {
  WITHOUT = 'withoutAuth',
  WITH = 'withAuth',
}

export interface AuthContext {
  value: AuthContextValue;
  redirectTo?: string;
}

export interface useUserAuthType {
  isAuth: boolean;
  isNotAuth: boolean;
  loading: boolean;
}

export type User = {
  id: number;
  name: string;
};

export interface MainInitialProps {
  authContext?: AuthContext | AuthContextValue;
  namespacesRequired: string[];
}

export interface AppCookies {
  rol: string;
  userToken: string;
}
