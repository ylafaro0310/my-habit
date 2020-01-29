import { List, Record } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';
import { JSObject } from '../types/Common';
import HabitRecords from './HabitRecords';

export class Habit extends Record<{
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
    return new Habit(params);
  }
  isCompleted(date: Dayjs,habit_records: HabitRecords): boolean {
    return habit_records.filterById(this.id).filterByCompletedAt(date = dayjs('2020-01-08')).getList().size > 0
  }
}

export default class Habits extends Record<{
  items: List<Habit>;
}>({
  items: List(),
}){
  static fromResponse(response: JSObject) {
    const params = { ...response };
    params.items = List(params.habits.map((item: JSObject) => Habit.fromResponse(item)));
    return new Habits(params);
  }
  getList(): List<Habit>{
    return this.get('items');
  }
}