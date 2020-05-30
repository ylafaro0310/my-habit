import React from 'react';
import { Redirect } from 'react-router-dom';

import { Path } from '../routes';

type Props = {
  isLoggedIn: boolean;
};
const Auth: React.FC<Props> = ({ isLoggedIn, children }) =>
  isLoggedIn ? <>{children}</> : <Redirect to={Path.login} />;

export default Auth;
