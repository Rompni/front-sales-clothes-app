import { useState, FunctionComponent } from 'react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ILoginData } from '../../interfaces/auth';
import { useRouter } from 'next/router';
import firebase from '../../firebase/config';
import cookie from 'cookie';

const LoginForm: FunctionComponent = (): JSX.Element => {
  const [message] = useState(false);
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILoginData>();

  const router = useRouter();

  const onSubmitLogin = async (data: ILoginData, e: any) => {
    if (firebase) {
      setIsLoading(true);
      e.preventDefault();
      setLoginError(false);
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(async (respose) => {
            respose.user?.getIdToken().then((token) => {
              document.cookie =
                cookie.serialize('userToken', token) || 'undefined';
            });
            document.cookie = cookie.serialize(
              'rol',
              respose.user?.uid || 'undefined'
            );
            reset();
            await router.reload();
          })
          .catch(() => {
            setLoginError(true);
            setIsLoading(false);
            setTimeout(() => {
              setLoginError(false);
            }, 3000);
          });
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLogin)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center ">
        <Logo width="64px" height="64px" />
      </div>
      <h1 className="flex justify-center text-3xl text-accent-9 font-extrabold pb-12">
        {t('login')}
      </h1>

      <div className="flex flex-col space-y-3">
        {message && (
          <div className=" p-3">
            <span className="text-accent-9 inline font-bold hover:underline cursor-pointer">
              {t('lost_pass')}
            </span>
          </div>
        )}
        <Input
          type="email"
          placeholder={t('form.email')}
          ownRef={register('email', {
            required: t('form.error.required') + '',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t('form.error.email'),
            },
          })}
        />

        {errors.email && (
          <div className="mt-2 text-xs text-red">{errors.email.message}</div>
        )}

        <Input
          type="password"
          placeholder={t('form.password')}
          ownRef={register('password', {
            required: t('form.error.required') + '',
            minLength: {
              value: 6,
              message: t('form.error.min_length'),
            },
          })}
        />

        {errors.password && (
          <div className="mt-2 text-xs text-red">{errors.password.message}</div>
        )}
        {loginError ? <div>{t('login:login_error')}</div> : null}
        <Button variant="slim" type="submit" loading={isLoading}>
          {t('login:log_in')}
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accent-7 mr-1">{t('login:not_reg')}</span>
          <Link href={`/${i18n.language}/auth/register`} passHref>
            <span className="text-accent-9 font-bold hover:underline cursor-pointer">
              {t('login:sign_up')}
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
