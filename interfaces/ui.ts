import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  JSXElementConstructor,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'flat' | 'slim' | 'ghost';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  height?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

export interface IContainerProps {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  ownRef?: UseFormRegisterReturn;
}

export interface IModalProps {
  className?: string;
  children?: any;
  onClose: () => void;
  onEnter?: () => void | null;
}
