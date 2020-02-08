import { JSObject } from '../../types/Common';

import { ApiClient } from './apiClient';

const apiClient = new ApiClient();

const HABIT_RECORD_PATH = '/api/habits/records';

export class HabitRecordsApi {
  static get(params?: JSObject): Promise<{}> {
    return apiClient.get(HABIT_RECORD_PATH, params);
  }
  static post(params: JSObject): Promise<{}> {
    return apiClient.post(HABIT_RECORD_PATH, params);
  }
  static delete(habitRecordId: number): Promise<{}> {
    return apiClient.delete(HABIT_RECORD_PATH + '/' + habitRecordId);
  }
}
