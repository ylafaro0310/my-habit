import { Record } from 'immutable';
import { Dayjs } from 'dayjs';

import { JSObject } from '../types/Common';
import dayjs from '../lib/dayjs-ja';

export default class HabitSessions extends Record<{
  habitId: number;
  completedAt: Dayjs;
  workingHours: number; // 単位は「分」
}>({
  habitId: 0,
  completedAt: dayjs(),
  workingHours: 0,
}) {
  static fromResponse(response: JSObject): HabitSessions {
    const params = { ...response };
    return new HabitSessions(params);
  }
}
