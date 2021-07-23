import Avatar from 'react-avatar';
import { FunctionComponent } from 'react';

interface IUserAvatar {
  name: string;
}

const UserAvatar: FunctionComponent<IUserAvatar> = ({ name }): JSX.Element => {
  return <Avatar name={name?.charAt(0)} size="32" round={true} />;
};

export default UserAvatar;
