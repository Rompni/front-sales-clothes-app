import firebase from './config';
import { IDocProduct } from '../interfaces/product';

const db = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_NAME || '';

export const createProduct = async (data: IDocProduct): Promise<void> => {
  return await firebase.firestore().collection(db).doc().set(data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  return await firebase.firestore().collection(db).doc(id).delete();
};
export const updateProduct = async (data: any, id: string): Promise<void> => {
  return await firebase.firestore().collection(db).doc(id).update(data);
};

export const getProducts = async (): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  return firebase.firestore().collection(db).get();
};

export const getProductBySlug = async (
  slug: string | string[] | undefined
): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  return await firebase
    .firestore()
    .collection(db)
    .where('slug', '==', slug)
    .get();
};

export const getProductByNotSlug = async (
  slug: string | string[] | undefined
): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  return await firebase
    .firestore()
    .collection(db)
    .where('slug', '!=', slug)
    .limit(4)
    .get();
};
