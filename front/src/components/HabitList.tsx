import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitsActions } from '../redux/modules/Habits';

type HabitListProps = {
  habits: Habits;
  habitRecords: HabitRecords;
  selectedDate: string;
};

const HabitList: React.FC<HabitListProps> = ({ habits, habitRecords, selectedDate }: HabitListProps) => {
  const dispatch = useDispatch();
  const onChangeHabitRecord = (event: React.ChangeEvent<HTMLInputElement>, habitId: number): void => {
    if (event.target.checked) {
      const params = {
        habitId,
        isSkipped: false,
      };
      dispatch(HabitsActions.addHabit(params));
    } else {
      const params = {
        habitId,
      };
      dispatch(HabitsActions.removeHabit(params));
    }
  };
  return (
    <div className='habits'>
      <form>
        {habits.getList().map((habit, key) => (
          <ListItem key={key}>
            <Checkbox
              id={'habit_' + habit.id}
              type='checkbox'
              checked={habit.isCompleted(dayjs(selectedDate), habitRecords)}
              onChange={e => {
                onChangeHabitRecord(e, habit.id);
              }}
            />
            <label htmlFor={'habit_' + habit.id}>{habit.habitName}</label>
          </ListItem>
        ))}
      </form>
    </div>
  );
};

const ListItem = styled.div``;

const Checkbox = styled.input``;

export default HabitList;
