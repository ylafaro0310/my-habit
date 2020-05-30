import { Record } from 'immutable';

export class Auth extends Record<{
  isLoggedIn: boolean | undefined;
}>({
  isLoggedIn: undefined,
}) {}
