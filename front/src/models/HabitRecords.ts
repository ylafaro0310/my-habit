import { List, Record } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';

import { JSObject } from '../types/Common';

export class HabitRecord extends Record<{
    habitId: number;
    completedAt: Dayjs;
    isSkipped: boolean;
}>({
    habitId: 0,
    completedAt: dayjs(),
    isSkipped: false,
}) {
    static fromResponse(response: JSObject): HabitRecord {
        const params = { ...response };
        return new HabitRecord(params);
    }
}

export default class HabitRecords extends Record<{
    items: List<HabitRecord>;
}>({
    items: List(),
}) {
    static fromResponse(response: JSObject): HabitRecords {
        const params = { ...response };
        params.items = List(params.habitRecords.map((item: JSObject) => HabitRecord.fromResponse(item)));
        return new HabitRecords(params);
    }
    getList(): List<HabitRecord> {
        return this.get('items');
    }
    filterById(id: number): HabitRecords {
        return this.set(
            'items',
            this.get('items').filter(habitRecord => habitRecord.habitId === id),
        );
    }
    filterByCompletedAt(date: Dayjs): HabitRecords {
        return this.set(
            'items',
            this.get('items').filter(habitRecord => habitRecord.completedAt.isSame(date)),
        );
    }
}
