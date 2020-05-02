import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import dayjs from '../lib/dayjs-ja';
import Habits, { Habit } from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';
import Card from '../components/Card';

type HabitListProps = {
  habits: Habits;
  habitRecords: HabitRecords;
  selectedDate: string;
  displayCompletedHabits: boolean;
  categoriesOfHabitsDisplayed: string;
  toggleDisplayCompletedHabit: () => void;
  addHabitRecord: (params: object) => void;
  removeHabitRecord: (params: object) => void;
};

const isTodaysHabit = (
  habit: Habit,
  habitRecords: HabitRecords,
  selectedDate: string,
): boolean => {
  const repeatType = habit.repeatType;
  const repeatValue = habit.repeatValue;
  if (repeatType === 'interval') {
    for (let i = 1; i < repeatValue; i++) {
      if (
        habitRecords
          .getList()
          .filter(elem => elem.habitId === habit.id)
          .find(elem => elem.completedAt.add(i, 'day').isSame(selectedDate))
      ) {
        return false;
      }
    }
  }
  if (repeatType === 'dayOfWeek') {
    const selectedDateBit = 0b1 << (6 - dayjs(selectedDate).get('d'));
    return Boolean(repeatValue & selectedDateBit);
  }
  if (repeatType === 'week') {
    let count = 0;
    for (let date = dayjs(selectedDate); ; date = date.subtract(1, 'day')) {
      if (
        habitRecords
          .getList()
          .filter(elem => elem.habitId === habit.id)
          .find(elem => elem.completedAt.isSame(date))
      ) {
        count++;
      }
      if (date.get('d') === 0) {
        break;
      }
    }
    return count < repeatValue;
  }
  return true;
};

const isCompleted = (
  habit: Habit,
  habitRecords: HabitRecords,
  selectedDate: string,
): boolean =>
  habitRecords
    .getList()
    .filter(elem => elem.habitId === habit.id)
    .find(elem => elem.completedAt.isSame(selectedDate))
    ? true
    : false;

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  habitRecords,
  selectedDate,
  categoriesOfHabitsDisplayed,
  displayCompletedHabits,
  toggleDisplayCompletedHabit,
  addHabitRecord,
  removeHabitRecord,
}: HabitListProps) => {
  const onChangeHabitRecord = (
    event: React.ChangeEvent<HTMLInputElement>,
    habitId: number,
    selectedDate: string,
  ): void => {
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

  let habitsDisplayed =
    categoriesOfHabitsDisplayed === 'today'
      ? habits
          .getList()
          .filter(habit => isTodaysHabit(habit, habitRecords, selectedDate))
      : habits.getList();

  habitsDisplayed = displayCompletedHabits
    ? habitsDisplayed
    : habitsDisplayed.filter(
        habit => !isCompleted(habit, habitRecords, selectedDate),
      );

  return habits.getList().size > 0 ? (
    <Card>
      <form>
        {habitsDisplayed.map((habit, key) => (
          <ListItem key={key}>
            <input
              checked={habit.isCompleted(dayjs(selectedDate), habitRecords)}
              id={'habit_' + habit.id}
              onChange={e => {
                onChangeHabitRecord(e, habit.id, selectedDate);
              }}
              type='checkbox'
            />
            <label htmlFor={'habit_' + habit.id}>
              <div>{habit.habitName}</div>
              <div>{habit.consecutiveDays}日連続</div>
            </label>
            <EditButton>
              <Link to={'habits/' + habit.id}>
                <span className='fas fa-edit' />
              </Link>
            </EditButton>
          </ListItem>
        ))}
      </form>
      <LinkButton
        id='toggleDisplayCompletedHabit'
        onClick={toggleDisplayCompletedHabit}
      >
        {displayCompletedHabits ? (
          <Upward>{'達成済みを非表示にする'}</Upward>
        ) : (
          <Downward>{'達成済みを表示する'}</Downward>
        )}
      </LinkButton>
    </Card>
  ) : null;
};

export default connect(null, dispatch => ({
  addHabitRecord: (params: object): void => {
    dispatch(HabitRecordsActions.addHabitRecord(params));
  },
  removeHabitRecord: (params: object): void => {
    dispatch(HabitRecordsActions.removeHabitRecord(params));
  },
}))(HabitList);

const LinkButton = styled.div`
  color: #2196f3;
  padding: 0.5rem;
  left: 1.5rem;
  cursor: pointer;
  position: relative;
`;

const EditButton = styled.div`
  & a {
    position: relative;
    top: 0.8rem;
    color: #2196f3;
  }
  & a:visited {
    color: #2196f3;
  }
`;

const Upward = styled.span`
  &:before {
    position: absolute;
    content: ' ';
    left: -0.8rem;
    top: 1rem;
    width: 5px;
    height: 5px;
    border: 3px solid;
    border-color: transparent transparent #2196f3 #2196f3;
    transform: rotate(135deg);
  }
`;

const Downward = styled.span`
  &:before {
    position: absolute;
    content: ' ';
    left: -0.8rem;
    top: 0.6rem;
    width: 5px;
    height: 5px;
    border: 3px solid;
    border-color: transparent transparent #2196f3 #2196f3;
    transform: rotate(-45deg);
  }
`;

const ListItem = styled.div`
  position: relative;
  padding: 0.5rem;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  justify-content: space-between;

  & input {
    display: none;
  }

  & label {
    top: 50%;
    width: 100%;
    padding-left: 2rem;
  }
  & label:before {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0.55rem;
    left: -0.1rem;
    border: 1px solid #2196f3;
    content: ' ';
    border-radius: 10px;
    float: left;
    margin: 0 10px;
    cursor: pointer;
  }
  & label:after {
    display: none;
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    content: '';
    color: #2196f3;
    width: 14px;
    height: 14px;
    background-color: #2196f3;
    border-radius: 7px;
    cursor: pointer;
  }
  & input:checked + label:after {
    display: block;
  }
`;
