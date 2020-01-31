import dayjs from 'dayjs';

import { Habit } from '../Habits';
import HabitRecords from '../HabitRecords';

const response = {
    habits: [
        { id: 1, habitName: '読書する' },
        { id: 2, habitName: '筋トレ' },
        { id: 3, habitName: '新しいCDを1枚聴く' },
    ],
    habitRecords: [
        { habitId: 2, completedAt: dayjs('2020-01-08'), isSkipped: false },
        { habitId: 1, completedAt: dayjs('2020-01-08'), isSkipped: false },
        { habitId: 1, completedAt: dayjs('2020-01-09'), isSkipped: false },
    ],
};

describe('Class: Habit', () => {
    it('.isCompleted()', () => {
        const habit = Habit.fromResponse(response.habits[0]);
        const habitRecords = HabitRecords.fromResponse(response);
        let isCompleted = habit.isCompleted(dayjs('2020-01-08'), habitRecords);
        expect(isCompleted).toBe(true);

        isCompleted = habit.isCompleted(dayjs('2020-01-10'), habitRecords);
        expect(isCompleted).toBe(false);
    });
});
