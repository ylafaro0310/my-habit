import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_PATH = '/habits';

export class HabitApi {
  static get(params: JSObject): Promise<{}> {
    return apiClient.get(HABIT_PATH, params);
  }
  static post(params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_PATH, params);
  }
  static patch(params: JSObject): Promise<{}> {
    return apiClient.patch(HABIT_PATH, params);
  }
  static delete(): Promise<{}> {
    return apiClient.delete(HABIT_PATH);
  }
}
