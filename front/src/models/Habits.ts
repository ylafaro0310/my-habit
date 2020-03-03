import { List, Record } from 'immutable';
import { Dayjs } from 'dayjs';

import { JSObject } from '../types/Common';
import dayjs from '../lib/dayjs-ja';

import HabitRecords from './HabitRecords';

export class Habit extends Record<{
  id: number;
  habitName: string;
  repeatType: string;
  repeatValue: number;
  startedAt: Dayjs;
  targetTime: number; // 単位は「分」
  timeOfDay: string;
  consecutiveDays: number;
  //consecutiveWeeks: number | null;
}>({
  id: 0,
  habitName: '',
  repeatType: 'day_of_week',
  repeatValue: 127,
  startedAt: dayjs(),
  targetTime: 0,
  timeOfDay: '',
  consecutiveDays: 0,
  //consecutiveWeeks: null,
}) {
  static fromResponse(response: JSObject): Habit {
    const params = { ...response };
    return new Habit(params);
  }
  isCompleted(date: Dayjs, habitRecords: HabitRecords): boolean {
    return habitRecords
      ? habitRecords
          .filterById(this.id)
          .filterByCompletedAt(date)
          .getList().size > 0
      : false;
  }
}

export default class Habits extends Record<{
  items: List<Habit>;
}>({
  items: List(),
}) {
  static fromResponse(response: JSObject): Habits {
    const params = { ...response };
    params.items = List(params.habits.map((item: JSObject) => Habit.fromResponse(item)));
    return new Habits(params);
  }
  getList(): List<Habit> {
    return this.get('items');
  }
}
