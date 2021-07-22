import Avatar from 'react-avatar';
import { FunctionComponent } from 'react';

const UserAvatar: FunctionComponent = (): JSX.Element => {
  return <Avatar name="Guess Name" size="32" round={true} />;
};

export default UserAvatar;
