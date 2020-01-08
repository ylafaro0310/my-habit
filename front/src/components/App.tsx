import React from 'react';
import './App.css';

const habits = [
  { id: 1, habit_name: "読書する" },
  { id: 2, habit_name: "筋トレ" },
  { id: 3, habit_name: "新しいCDを1枚聴く" },
]

const habit_records = [
  { habit_id: 2, completion_date: "2020-01-08" },
  { habit_id: 1, completion_date: "2020-01-08" },
]

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="date">
        <div>Today</div>
      </div>
      <div className="habits">
        <form>
          {habits.map(({id,habit_name})=>(
            <div>
              <input id={"habit"+id} type="checkbox" checked={habit_records.findIndex(({habit_id,completion_date})=>(habit_id == id && completion_date == "2020-01-08")) > -1}/>
              <label htmlFor={"habit"+id}>{habit_name}</label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

export default App;
