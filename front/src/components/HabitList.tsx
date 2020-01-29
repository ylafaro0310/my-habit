import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';

type HabitListProps = {
    habits: Habits;
    habit_records: HabitRecords;
}

const HabitList: React.FC<HabitListProps> = ({habits,habit_records}) => {
    return (
        <div className="habits">
        <form>
          {habits.getList().map((habit)=>(
            <ListItem>
              <Checkbox 
                id={"habit_"+habit.id} 
                type="checkbox" 
                checked={habit.isCompleted(dayjs('2020-01-08'),habit_records)}
                />
              <label 
                htmlFor={"habit_"+habit.id}
                >
                    {habit.habit_name}
                </label>
            </ListItem>
          ))}
        </form>
      </div>
    )
}

const ListItem = styled.div``

const Checkbox = styled.input``

export default HabitList;