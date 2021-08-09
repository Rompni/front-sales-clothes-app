import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase/config';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';

interface IRegisterForm {
  email: string;
  passwordOne: string;
  passwordTwo: string;
}

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<IRegisterForm>();
  const { i18n, t } = useTranslation();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const passwordOne = useRef({});
  passwordOne.current = watch('passwordOne', '');

  const onSubmit = (data: IRegisterForm, e: any) => {
    if (firebase) {
      e.preventDefault();

      setIsLoading(true);
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.passwordTwo)
          .then(() => {
            console.log('q');

            e.target.reset();
            reset();
            setSuccess(true);
          })
          .catch((err) => {
            if (err.toJSON().code === 'auth/email-already-in-use') {
              setIsRegistered(true);
              // Ya esta registrado
            }
          });
      } catch (err) {
        console.warn(err);
      }
      setIsLoading(false);
      setTimeout(() => {
        setIsRegistered(false);
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center ">
        <Logo width="64px" height="64px" />
      </div>
      <h1 className="flex justify-center text-3xl text-accent-9 font-extrabold pb-12">
        {t('register')}
      </h1>
      <div className="flex flex-col space-y-3">
        <Input
          type="email"
          placeholder={t('form.email')}
          onChange={() => {
            if (isRegistered) setIsRegistered(false);
          }}
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
          ownRef={register('passwordOne', {
            required: t('form.error.required') + '',
            minLength: {
              value: 6,
              message: t('form.error.min_length'),
            },
          })}
        />

        {errors.passwordOne && (
          <div className="mt-2 text-xs text-red">
            {errors.passwordOne.message}
          </div>
        )}

        <Input
          type="password"
          placeholder={t('form.password2')}
          ownRef={register('passwordTwo', {
            required: t('form.error.required') + '',
            validate: (value) =>
              value === passwordOne.current || t('form.error.validate') + '',
          })}
        />

        {errors.passwordTwo && (
          <div className="mt-2 text-xs text-red">
            {errors.passwordTwo.message}
          </div>
        )}

        {isRegistered && (
          <div className="mt-2 text-xs text-red">
            Usuario ya ha sido registrado
          </div>
        )}
        <Button variant="slim" type="submit" loading={isLoading}>
          {t('register')}
        </Button>
        <div className="pt-1 text-center text-sm">
          <Link href={`/${i18n.language}/auth/login`} passHref>
            <span className="text-accent-9 font-bold hover:underline cursor-pointer">
              {`< ${t('back')}`}
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
