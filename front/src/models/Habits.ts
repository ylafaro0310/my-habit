import { Record } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';
import { JSObject } from '../types/Common';

export default class Habits extends Record<{
    id: number;
    habit_name: string;
    repeat_type: string;
    repeat_value: number;
    started_date: Dayjs;
    target_time: number; // 単位は「分」
    time_of_day: string;
    consecutive_days: number;
    consecutive_weeks: number | null;
}>({
    id: 0,
    habit_name: '',
    repeat_type: 'day_of_week',
    repeat_value: 127,
    started_date: dayjs(),
    target_time: 0,
    time_of_day: '',
    consecutive_days: 0,
    consecutive_weeks: null,
}) {
  static fromResponse(response: JSObject) {
    const params = { ...response };
    return new Habits(params);
  }
}