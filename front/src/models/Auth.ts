import { Record } from 'immutable';

export class Auth extends Record<{
  isLoggedIn: boolean | undefined;
  errors: [];
}>({
  isLoggedIn: undefined,
  errors: []
}) {}
