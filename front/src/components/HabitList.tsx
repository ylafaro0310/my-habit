import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';

type HabitListProps = {
  habits: Habits;
  habitRecords: HabitRecords;
  selectedDate: string;
  addHabitRecord: (params: object) => void;
  removeHabitRecord: (habitId: number) => void;
};

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  habitRecords,
  selectedDate,
  addHabitRecord,
  removeHabitRecord,
}: HabitListProps) => {
  const onChangeHabitRecord = (event: React.ChangeEvent<HTMLInputElement>, habitId: number): void => {
    if (event.target.checked) {
      const params = {
        habitId,
        isSkipped: false,
      };
      addHabitRecord(params);
    } else {
      removeHabitRecord(habitId);
    }
  };
  return (
    <div className='habits'>
      <form>
        {habits.getList().map((habit, key) => (
          <div key={key}>
            <input
              id={'habit_' + habit.id}
              type='checkbox'
              checked={habit.isCompleted(dayjs(selectedDate), habitRecords)}
              onChange={e => {
                onChangeHabitRecord(e, habit.id);
              }}
            />
            <label htmlFor={'habit_' + habit.id}>{habit.habitName}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default connect(null, dispatch => ({
  addHabitRecord: (params: object): void => {
    dispatch(HabitRecordsActions.addHabitRecord(params));
  },
  removeHabitRecord: (habitId: number): void => {
    dispatch(HabitRecordsActions.removeHabitRecord(habitId));
  },
}))(HabitList);
