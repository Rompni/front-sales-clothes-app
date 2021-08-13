import { FunctionComponent, useState } from 'react';
import firebase from '../../firebase/config';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { IRegisterProduct, Product } from '../../interfaces/product';
import { useTranslation } from 'react-i18next';
import InputTextArea from '../ui/InputTextArea';
import { updateProduct } from '../../firebase/ProductServices';
import Swal from 'sweetalert2';

const FormEditProduct: FunctionComponent<Product> = ({
  name,
  description,
  price,
  slug,
  id,
}): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const onSubmitEditProduct = async (data: IRegisterProduct, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (firebase) {
      try {
        updateProduct(data, id || '')
          .then(() => {
            Swal.fire(t('success'), t('updated'), 'success');
            setIsLoading(false);
            reset();
          })
          .catch((err) => {
            setIsLoading(false);
            Swal.fire(t('no_updated'), err.code, 'error');
          });
      } catch (e) {
        console.error('updating... ', e);
      }
    } else {
      console.log('error firebase');
    }
  };

  return (
    <>
      <form className="w-80 flex flex-col justify-between p-3 ">
        <div className="flex flex-col space-y-3">
          <span className="text-center text-3xl font-bold ">{`${t('edit')} ${t(
            'product'
          )}`}</span>
          <Input
            type="text"
            placeholder={t('product_name')}
            defaultValue={name}
            ownRef={register('name', {
              required: t('product_name_required') + '',
            })}
            readOnly
          />

          {errors.name && (
            <div className="mt-2 text-xs text-red">{errors.name.message}</div>
          )}

          <InputTextArea
            cols={0}
            rows={4}
            defaultValue={description}
            placeholder={t('product_description')}
            ownRef={register('description', {
              required: t('product_description') + '',
            })}
          />

          {errors.description && (
            <div className="mt-2 text-xs text-red">
              {errors.description.message}
            </div>
          )}
          <Input
            type="number"
            defaultValue={price}
            placeholder={t('price')}
            ownRef={register('price', {
              required: t('price_required') + '',
              validate: { positive: (value) => value > 0 },
            })}
          />

          {errors.price && errors.price?.type !== 'positive' && (
            <div className="mt-2 text-xs text-red">{errors.price.message}</div>
          )}

          {errors.price?.type === 'positive' && (
            <div className="mt-2 text-xs text-red">
              {t('only_positive_numbers')}
            </div>
          )}

          <Input
            type="text"
            defaultValue={slug}
            placeholder={t('product_slug')}
            ownRef={register('slug', {
              required: 'slug is required',
            })}
            readOnly
          />

          {errors.slug && (
            <div className="mt-2 text-xs text-red">{errors.slug.message}</div>
          )}
        </div>
      </form>
      <div className="w-80 flex flex-col justify-between p-3 space-y-3 ">
        <Button
          variant="slim"
          type="submit"
          loading={isLoading}
          onClick={handleSubmit(onSubmitEditProduct)}
        >
          {t('update')}
        </Button>
      </div>
    </>
  );
};

export default FormEditProduct;
