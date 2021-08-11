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

const FormCreateProduct: FunctionComponent = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { myFile, handleFile } = useContext(FileContext);
  const { t } = useTranslation();
  const onSubmitCreateProduct = async (data: IRegisterProduct, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (firebase) {
      try {
        if (myFile) {
          const storageRef = firebase.storage().ref('/image/' + myFile.name);
          const task = storageRef.put(myFile);
          task.on('state_changed', (snapshot) => {
            setProgress(
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            if (snapshot.bytesTransferred === snapshot.totalBytes) {
              task.snapshot.ref.getDownloadURL().then((image) => {
                if (image !== '') {
                  const product: IDocProduct = { ...data, image };
                  createProduct(product)
                    .then(() => {
                      Swal.fire(t('success'), t('product_create'), 'success');
                      setIsLoading(false);
                      handleFile('');
                      setProgress(0);
                      reset();
                    })
                    .catch((err) => {
                      setIsLoading(false);
                      setProgress(0);
                      handleFile('');
                      Swal.fire(t('error_create_product'), err.code, 'error');
                    });
                }
              });
            }
          });
        } else {
          setIsLoading(false);
          setProgress(0);
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
            Create Product
          </Text>
          <Input
            type="text"
            placeholder="Product Name"
            ownRef={register('name', {
              required: t('product_name_required') + '',
            })}
          />

          {errors.name && (
            <div className="mt-2 text-xs text-red">{errors.name.message}</div>
          )}
          <Input
            type="text"
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
          <InputFileUpload />
        </div>

        {/* <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-600 bg-blueGray-200">
                Task in progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blueGray-600">
                {`${progress}%`}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-500">
            <div
                style={{width: `${progress}%`}}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
            />
          </div>
        </div> */}
        <Button
          variant="slim"
          type="submit"
          loading={isLoading}
          onClick={handleSubmit(onSubmitCreateProduct)}
        >
          {t('create')}
        </Button>
      </div>
    </>
  );
};

export default FormCreateProduct;
