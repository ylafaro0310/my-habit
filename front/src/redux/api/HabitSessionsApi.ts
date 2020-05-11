import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_PATH = '/api/habits';
const HABIT_SESSION_PATH = '/api/habits/sessions';

export class HabitSessionsApi {
  static get(habitId: number, params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_PATH + '/' + habitId + '/sessions', params);
  }
  static post(habitId: number, params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_PATH + '/' + habitId + '/sessions', params);
  }
  static patch(habitSessionId: number, params: JSObject): Promise<{}> {
    return apiClient.patch(HABIT_SESSION_PATH + '/' + habitSessionId, params);
  }
  static delete(habitSessionId: number): Promise<{}> {
    return apiClient.delete(HABIT_SESSION_PATH + '/' + habitSessionId, params);
  }
}
