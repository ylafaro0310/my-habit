import { Record } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';
import { JSObject } from '../types/Common';

export default class HabitRecords extends Record<{
    habit_id: number;
    completed_at: Dayjs;
    is_skipped: boolean;
}>({
    habit_id: 0,
    completed_at: dayjs(),
    is_skipped: false,
}) {
  static fromResponse(response: JSObject) {
    const params = { ...response };
    return new HabitRecords(params);
  }
}