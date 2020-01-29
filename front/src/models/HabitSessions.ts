import { Record } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';
import { JSObject } from '../types/Common';

export default class HabitSessions extends Record<{
    habit_id: number;
    completed_at: Dayjs;
    working_hours: number; // 単位は「分」
}>({
    habit_id: 0,
    completed_at: dayjs(),
    working_hours: 0,
}) {
  static fromResponse(response: JSObject) {
    const params = { ...response };
    return new HabitSessions(params);
  }
}