import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import HabitList from '../components/HabitList';

const response = {
  habits: [
    { id: 1, habitName: '読書する' },
    { id: 2, habitName: '筋トレ' },
    { id: 3, habitName: '新しいCDを1枚聴く' },
  ],
  habitRecords: [
    { habitId: 2, completedAt: dayjs('2020-01-08') },
    { habitId: 1, completedAt: dayjs('2020-01-08') },
  ],
};
const habits = Habits.fromResponse(response);

const habitRecords = HabitRecords.fromResponse(response);

const Record: React.FC = () => {
  const date = [];
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');
  for (let i = startOfMonth; !i.isAfter(endOfMonth); i = i.add(1, 'day')) {
    date.push(
      <div>
        <input type='radio' name='date' id={i.format('YYYY-MM-DD')} defaultChecked={dayjs().isSame(i, 'd')} />
        <label htmlFor={i.format('YYYY-MM-DD')}>{i.format('MM/DD')}</label>
      </div>,
    );
  }
  return (
    <div className='App'>
      <div className='date'>
        <button>習慣を追加する</button>
        <DateList>
          {date.map((elem, key) => (
            <li key={key}>{elem}</li>
          ))}
        </DateList>
      </div>
      <HabitList habits={habits} habitRecords={habitRecords} />
    </div>
  );
};

export default Record;

const DateList = styled.ul`
  & li {
    display: inline-block;
  }
`;
