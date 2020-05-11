import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_PATH = '/api/habits';
const HABIT_SESSION_PATH = '/api/habits/sessions';

export class HabitSessionsApi {
  static get(params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_SESSION_PATH, params);
  }
  static getAll(habitId: number, params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_PATH + '/' + habitId, params);
  }
  static post(params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_SESSION_PATH, params);
  }
  static delete(params: JSObject): Promise<{}> {
    return apiClient.delete(HABIT_SESSION_PATH, params);
  }
}
