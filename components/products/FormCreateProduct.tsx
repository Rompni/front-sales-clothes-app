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

export interface IDocProduct {
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
}

export interface IRegisterProduct {
  name: string;
  description: string;
  price: number;
  slug: string;
}

const FormCreateProduct: FunctionComponent = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegisterProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { myFile, handleFile } = useContext(FileContext);

  const onSubmitCreateProduct = async (data: IRegisterProduct, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (firebase) {
      try {
        if (myFile) {
          const storageRef = firebase.storage().ref('/image/' + myFile.name);
          const task = storageRef.put(myFile);
          task.on('state_changed', (snapshot) => {
            if (snapshot.bytesTransferred === snapshot.totalBytes) {
              task.snapshot.ref.getDownloadURL().then((image) => {
                if (image !== '') {
                  const product: IDocProduct = { ...data, image };
                  createProduct(product)
                    .then(() => {
                      Swal.fire('Success!', 'Product are created!', 'success');
                      setIsLoading(false);
                      handleFile('');
                      reset();
                    })
                    .catch((err) => {
                      setIsLoading(false);
                      handleFile('');
                      Swal.fire(
                        'Error white create product!',
                        err.code,
                        'error'
                      );
                    });
                }
              });
            }
          });
        } else {
          setIsLoading(false);
          Swal.fire('Error Image', 'The image is required', 'error');
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
              required: 'product name is required',
            })}
          />

          {errors.name && (
            <div className="mt-2 text-xs text-red">{errors.name.message}</div>
          )}
          <Input
            type="text"
            placeholder="Product Description"
            ownRef={register('description', {
              required: 'description is required',
            })}
          />
          {errors.description && (
            <div className="mt-2 text-xs text-red">
              {errors.description.message}
            </div>
          )}
          <Input
            type="number"
            placeholder="Price"
            ownRef={register('price', {
              required: 'price is required',
              validate: { positive: (value) => value > 0 },
            })}
          />

          {errors.price && errors.price?.type !== 'positive' && (
            <div className="mt-2 text-xs text-red">{errors.price.message}</div>
          )}

          {errors.price?.type === 'positive' && (
            <div className="mt-2 text-xs text-red">
              Only positive numbers accepted
            </div>
          )}

          <Input
            type="text"
            placeholder="Product Slug"
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

        <Button
          variant="slim"
          type="submit"
          loading={isLoading}
          onClick={handleSubmit(onSubmitCreateProduct)}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default FormCreateProduct;
