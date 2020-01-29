import React from 'react';
import './App.css';
import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import HabitList from '../components/HabitList';
import dayjs from 'dayjs';

const response = {
  habits: [
    { id: 1, habit_name: "読書する" },
    { id: 2, habit_name: "筋トレ" },
    { id: 3, habit_name: "新しいCDを1枚聴く" },
  ],
  habit_records: [
    { habit_id: 2, completed_at: dayjs("2020-01-08") },
    { habit_id: 1, completed_at: dayjs("2020-01-08") },
  ]
}
const habits = Habits.fromResponse(response)

const habit_records = HabitRecords.fromResponse(response)

const Record: React.FC = () => {
  return (
    <div className="App">
      <div className="date">
        <div>Today</div>
      </div>
      <HabitList habits={habits} habit_records={habit_records}/>
    </div>
  );
}

export default Record;
