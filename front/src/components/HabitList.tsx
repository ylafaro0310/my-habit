import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';
import Card from '../components/Card';

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
      habits.getList().size > 0 ?
      <Card>
      <form>
        {habits.getList().map((habit, key) => (
          <ListItem key={key}>
            <input
              id={'habit_' + habit.id}
              type='checkbox'
              checked={habit.isCompleted(dayjs(selectedDate), habitRecords)}
              onChange={e => {
                onChangeHabitRecord(e, habit.id);
              }}
            />
            <label htmlFor={'habit_' + habit.id}>
              <div>{habit.habitName}</div>
              <div>{habit.consecutiveDays}日連続</div>
            </label>
          </ListItem>
        ))}
      </form>
      </Card>
      : null
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

const ListItem = styled.div`
  position: relative;
  padding: 0.5rem;
  border-bottom: 1px solid #c0c0c0;

  & input {
    display: none;
  }

  &:last-child {
    border-bottom: 0px;
  }
  & label {
    top: 50%;
  }
  & label:before{
    width: 20px;
    height: 20px;
    border: 1px solid #2196F3;
    content: ' ';
    border-radius: 10px;
    float: left;
    margin:0 10px;
    cursor: pointer;
  }
  & label:after{
    display: none;
    top: 0.75em;
    left: 1.4em;
    content: '';
    color: #2196F3;
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: #2196F3;
    border-radius: 7px;
    cursor: pointer;
  }
  & input:checked + label:after {
    display: block;
  }
  `