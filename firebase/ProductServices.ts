import firebase from './config';
import { IDocProduct } from '../components/products/FormCreateProduct';

export const createProduct = async (data: IDocProduct): Promise<void> => {
  return await firebase.firestore().collection('products').doc().set(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  return await firebase.firestore().collection('products').doc(id).delete();
};
export const updateProduct = async (data: any, id: string): Promise<void> => {
  return await firebase.firestore().collection('products').doc(id).update(data);
};
