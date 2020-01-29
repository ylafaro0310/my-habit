import { Record, List } from 'immutable';
import dayjs, { Dayjs } from 'dayjs';
import { JSObject } from '../types/Common';

export class HabitRecord extends Record<{
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
    return new HabitRecord(params);
  }
}

export default class HabitRecords extends Record<{
  items: List<HabitRecord>;
}>({
  items: List(),
}){
  static fromResponse(response: JSObject) {
    const params = { ...response };
    params.items = List(params.habit_records.map((item: JSObject) => HabitRecord.fromResponse(item)));
    return new HabitRecords(params);
  }
  getList(): List<HabitRecord>{
    return this.get('items');
  }
  filterById(id: number): HabitRecords{
    let model = this;
    return model.set('items',model.get('items')
      .filter((habit_record)=>(habit_record.habit_id === id)));
  }
  filterByCompletedAt(date: Dayjs): HabitRecords{
    let model = this;
    return model.set('items',model.get('items')
      .filter((habit_record)=>(habit_record.completed_at.isSame(date))));
  }
}