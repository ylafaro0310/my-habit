import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_RECORD_PATH = '/habits/records';

export class HabitRecordApi {
  static get(params: JSObject): Promise<{}> {
    return apiClient.get(HABIT_RECORD_PATH, params);
  }
  static post(params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_RECORD_PATH, params);
  }
  static delete(): Promise<{}> {
    return apiClient.delete(HABIT_RECORD_PATH);
  }
}
