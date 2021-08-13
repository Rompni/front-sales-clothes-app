import { UseFormRegisterReturn } from 'react-hook-form';
import { ImageProps } from 'next/Image';

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

export interface InputFileProps {
  className?: string;
  onChange?: (...args: any[]) => any;
  ownRef?: UseFormRegisterReturn;
}

// re
export type ProductImage = {
  url: string;
  alt?: string;
};

// re
export type Stock = {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  value: number;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  slug: string;
  image: ProductImage;
  price: string;
  stock?: Stock[];
};

export interface IProductCardProps {
  className?: string;
  product: Product;
  noNameTag?: boolean;
  imgProps?: Omit<ImageProps, any>;
  variant?: 'default' | 'slim' | 'simple';
}

export interface IProductTable {
  value: any;
}

export interface IProductTableItem extends Product {
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export interface ProductTagProps {
  className?: string;
  name: string;
  price: string;
  fontSize?: number;
}

export interface ProductSidebarProps {
  description: string;
  className?: string;
}
