import * as icons from 'react-feather';
import { FunctionComponent } from 'react';
export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
} & icons.IconProps;

export const Icon: FunctionComponent<IconProps> = ({
  name,
  ...rest
}): JSX.Element => {
  const IconComponent = icons[name];
  return <IconComponent {...rest} />;
};
