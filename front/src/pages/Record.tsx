import React from 'react';
import dayjs from 'dayjs';
import './App.css';

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
  return (
    <div className='App'>
      <div className='date'>
        <div>Today</div>
      </div>
      <HabitList habits={habits} habitRecords={habitRecords} />
    </div>
  );
};

export default Record;
