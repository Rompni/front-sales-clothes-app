import { Product } from '../interfaces/product';

export const generateProduct = (doc: any): Product => {
  const { price, name, image, slug, stock, description } = doc.data();

  return {
    id: doc.id,
    name: name,
    description: description,
    price: price,
    image: { url: image },
    slug: slug,
    stock: stock,
  };
};
