import { FunctionComponent, useState } from 'react';
import Input from '../ui/Input';
import { useForm, Controller } from 'react-hook-form';
import InputFileUpload from './InputFileUpload';
import Text from '../ui/Text';
import Button from '../ui/Button';
import firebase from 'firebase';
import { createProduct } from '../../firebase/ProductServices';
import Swal from 'sweetalert2';

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
    control,
    setValue,
  } = useForm<IDocProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitCreateProduct = (data: IDocProduct, e: any) => {
    console.log(data);
    if (firebase) {
      e.preventDefault();
      setIsLoading(true);
      try {
        createProduct(data)
          .then(() => {
            reset();
            Swal.fire('Success!', 'Product are created!', 'success');
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
            Swal.fire('Error white create product!', err.code, 'error');
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpload = (e: any) => {
    if (firebase) {
      try {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref('/image/' + file.name);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            task.snapshot.ref.getDownloadURL().then((url) => {
              Swal.fire('Upload Success', url, 'success');
              setValue('image', url);
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitCreateProduct)}
      className="w-80 flex flex-col justify-between p-3 "
    >
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
            validate: (value) => value > 0,
          })}
        />

        {errors.price && (
          <div className="mt-2 text-xs text-red">{errors.price.message}</div>
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

        <div className="flex flex-row justify-between items-center">
          <Controller
            control={control}
            name={'image'}
            render={({ field }) => <InputFileUpload onChange={handleUpload} />}
          />
        </div>

        <Button variant="slim" type="submit" loading={isLoading}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default FormCreateProduct;
