import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_PATH = '/api/habits';

export class HabitsApi {
  static getAll(params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_PATH, params);
  }
  static get(id: number, params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_PATH + '/' + id, params);
  }
  static post(params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_PATH, params);
  }
  static patch(habitId: number, params: JSObject): Promise<{}> {
    return apiClient.patch(HABIT_PATH + '/' + habitId, params);
  }
  static delete(habitId: number): Promise<{}> {
    return apiClient.delete(HABIT_PATH + '/' + habitId);
  }
}
