import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const AUTH_PATH = '/';

export class AuthApi {
  static login(params: object): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'login', params);
  }
  static logout(): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'logout');
  }
  static user(): Promise<{}> {
    return apiClient.get(AUTH_PATH + 'api/user');
  }
  static register(params: object): Promise<{}> {
    return apiClient.post(AUTH_PATH + 'register', params);
  }
}
