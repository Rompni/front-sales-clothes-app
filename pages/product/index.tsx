import { AuthContextValue } from '../../interfaces/auth';

const ProductIndexPage = (): JSX.Element => {
  return <div></div>;
};
ProductIndexPage.getInitialProps = (): {
  authContext: { redirectTo: string; value: AuthContextValue };
} => ({
  authContext: {
    value: AuthContextValue.NOACCESS,
    redirectTo: '/',
  },
});

export default ProductIndexPage;
