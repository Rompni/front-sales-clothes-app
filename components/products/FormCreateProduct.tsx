import { FunctionComponent, useContext, useState } from 'react';
import Input from '../ui/Input';
import { useForm } from 'react-hook-form';
import InputFileUpload from './InputFileUpload';
import Text from '../ui/Text';
import Button from '../ui/Button';
import firebase from '../../firebase/config';
import { createProduct } from '../../firebase/ProductServices';
import Swal from 'sweetalert2';
import { FileContext } from '../context/FileContext';
import { IDocProduct, IRegisterProduct } from '../../interfaces/product';
import { useTranslation } from 'react-i18next';
import InputTextArea from '../ui/InputTextArea';
import { useRouter } from 'next/router';

const FormCreateProduct: FunctionComponent = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { myFile, handleFile } = useContext(FileContext);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const onSubmitCreateProduct = async (data: IRegisterProduct, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (firebase) {
      try {
        if (myFile) {
          const storageRef = firebase.storage().ref('/image/' + myFile.name);
          const task = storageRef.put(myFile);
          task.on('state_changed', (snapshot) => {
            const progress =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log(progress);
            if (snapshot.bytesTransferred === snapshot.totalBytes) {
              task.snapshot.ref.getDownloadURL().then((image) => {
                if (image !== '') {
                  const product: IDocProduct = { ...data, image };
                  createProduct(product)
                    .then(() => {
                      Swal.fire(t('success'), t('product_create'), 'success');
                      setIsLoading(false);
                      handleFile('');
                      reset();
                    })
                    .catch((err) => {
                      setIsLoading(false);
                      handleFile('');
                      Swal.fire(t('error_create_product'), err.code, 'error');
                    });
                }
              });
            }
          });
        } else {
          setIsLoading(false);
          Swal.fire(t('error_image'), t('image_required'), 'error');
        }
      } catch (err) {
        console.error('here', err);
      }
    } else {
      console.log('error firebase');
    }
  };

  return (
    <>
      <form className="w-80 flex flex-col justify-between p-3 ">
        <div className="flex flex-col space-y-3">
          <Text variant="heading" className="text-center">
            {`${t('create')} ${t('product')}`}
          </Text>
          <Input
            type="text"
            placeholder={t('product_name')}
            ownRef={register('name', {
              required: t('product_name_required') + '',
            })}
          />

          {errors.name && (
            <div className="mt-2 text-xs text-red">{errors.name.message}</div>
          )}
          <InputTextArea
            cols={0}
            rows={4}
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
            placeholder={t('product_slug')}
            ownRef={register('slug', {
              required: 'slug is required',
            })}
          />

          {errors.slug && (
            <div className="mt-2 text-xs text-red">{errors.slug.message}</div>
          )}
        </div>
      </form>
      <div className="w-80 flex flex-col justify-between p-3 space-y-3 ">
        <div className="flex flex-row justify-between items-center">
          <InputFileUpload id={'file'} />
        </div>

        <Button
          variant="slim"
          type="submit"
          loading={isLoading}
          onClick={handleSubmit(onSubmitCreateProduct)}
        >
          {t('create')}
        </Button>
        <div
          className="text-center cursor-pointer hover:text-accent-7"
          onClick={() => {
            router.push(`/${i18n.language}/admin/product`);
          }}
        >
          <strong>{`${t('back')}`}</strong>
        </div>
      </div>
    </>
  );
};

export default FormCreateProduct;
