import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';

type HabitListProps = {
    habits: Habits;
    habitRecords: HabitRecords;
};

const HabitList: React.FC<HabitListProps> = ({ habits, habitRecords }: HabitListProps) => {
    return (
        <div className='habits'>
            <form>
                {habits.getList().map((habit, key) => (
                    <ListItem key={key}>
                        <Checkbox
                            id={'habit_' + habit.id}
                            type='checkbox'
                            checked={habit.isCompleted(dayjs('2020-01-08'), habitRecords)}
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
