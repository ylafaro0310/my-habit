import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const AUTH_PATH = '/';

export class AuthApi {
  static logout(): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'logout');
  }
}
