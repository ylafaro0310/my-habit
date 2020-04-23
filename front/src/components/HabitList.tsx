import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import Habits, { Habit } from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

type HabitListProps = {
  habits: Habits;
  habitRecords: HabitRecords;
  selectedDate: string;
  addHabitRecord: (params: object) => void;
  removeHabitRecord: (params: object) => void;
};

const shouldBeDisplayed = (habit: Habit, habitRecords: HabitRecords, selectedDate: string): boolean => {
  const repeatType = habit.repeatType;
  const repeatValue = habit.repeatValue;
  if(repeatType == 'interval'){
    for(let i = 1; i < repeatValue; i++){
      if(habitRecords.getList().filter(elem=>elem.habitId == habit.id).find(elem=>elem.completedAt.add(i,'day').isSame(selectedDate))){
        return false;
      }
    }
  }
  if(repeatType == 'dayOfWeek' && repeatValue == 127){
    if(habitRecords.getList().filter(elem=>elem.habitId == habit.id).find(elem=>elem.completedAt.add(1,'day').isSame(selectedDate))){
      return false;
    }
  }
  return true;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  habitRecords,
  selectedDate,
  addHabitRecord,
  removeHabitRecord,
}: HabitListProps) => {
  const onChangeHabitRecord = (event: React.ChangeEvent<HTMLInputElement>, habitId: number, selectedDate: string): void => {
    if (event.target.checked) {
      const params = {
        habitId,
        completedAt: selectedDate,
        isSkipped: false,
      };
      addHabitRecord(params);
    } else {
      const params = {
        habitId,
        completedAt: selectedDate,
      };
      removeHabitRecord(params);
    }
  };
  return (
      habits.getList().size > 0 ?
      <Card>
      <form>
        {habits.getList().map((habit, key) => (
          shouldBeDisplayed(habit,habitRecords,selectedDate) ?
          <ListItem key={key}>
            <input
              id={'habit_' + habit.id}
              type='checkbox'
              checked={habit.isCompleted(dayjs(selectedDate), habitRecords)}
              onChange={e => {
                onChangeHabitRecord(e, habit.id, selectedDate);
              }}
            />
            <label htmlFor={'habit_' + habit.id}>
              <div>{habit.habitName}</div>
              <div>{habit.consecutiveDays}日連続</div>
            </label>
            <Link to={'habits/'+habit.id}><span className='fas fa-edit'/></Link>
          </ListItem>
          : null
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
  removeHabitRecord: (params: object): void => {
    dispatch(HabitRecordsActions.removeHabitRecord(params));
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