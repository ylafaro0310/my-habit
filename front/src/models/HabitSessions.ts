import { List, Record } from 'immutable';
import { Dayjs } from 'dayjs';

import { JSObject } from '../types/Common';
import dayjs from '../lib/dayjs-ja';

export class HabitSession extends Record<{
  habitId: number;
  completedAt: Dayjs;
  workingMinutes: number; // 単位は「分」
}>({
  habitId: 0,
  completedAt: dayjs(),
  workingMinutes: 0,
}) {
  static fromResponse(response: JSObject): HabitSession {
    const params = { ...response };
    return new HabitSession(params);
  }
}

export default class HabitSessions extends Record<{
  items: List<HabitSession>;
}>({
  items: List(),
}) {
  static fromResponse(response: JSObject): HabitSessions {
    const params = { ...response };
    params.items = List(
      params.habitSessions.map((item: JSObject) =>
        HabitSession.fromResponse(item),
      ),
    );
    return new HabitSessions(params);
  }
  getList(): List<HabitSession> {
    return this.get('items');
  }
}
