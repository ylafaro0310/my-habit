import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const AUTH_PATH = '/';

export class AuthApi {
  static login(params: object): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'login', params);
  }
  static user(): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'api/user');
  }
  static logout(): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'logout');
  }
}
