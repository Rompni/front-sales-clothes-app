import {
  useEffect,
  useState,
  useCallback,
  FunctionComponent,
  SyntheticEvent,
} from 'react';
import { validate } from 'email-validator';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const LoginForm: FunctionComponent = (): JSX.Element => {
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { i18n } = useTranslation();

  const handleLogin = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage('');
      /* validate sesion */
      setLoading(false);
    } catch ({ errors }) {
      setMessage(errors[0].message);
      setLoading(false);
    }
  };

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword);
    }
  }, [email, password, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">
            {message}. Did you {` `}
            <span className="text-accent-9 inline font-bold hover:underline cursor-pointer">
              forgot your password?
            </span>
          </div>
        )}
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7">Dont have an account?</span>
          <Link href={`/${i18n.language}/auth/register`} passHref>
            <span className="text-accent-9 font-bold hover:underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
