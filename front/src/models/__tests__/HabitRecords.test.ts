import dayjs from 'dayjs';

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

describe('Class HabitRecords', () => {
  const habitRecords = HabitRecords.fromResponse(response);
  it('.getList()', () => {
    expect(habitRecords.getList().toJS()).toMatchObject(response.habitRecords);
  });
  it('.filterById()', () => {
    expect(
      habitRecords
        .filterById(2)
        .getList()
        .toJS(),
    ).toMatchObject([response.habitRecords[0]]);
  });
  it('.filterByCompletedAt()', () => {
    expect(
      habitRecords
        .filterByCompletedAt(dayjs('2020-01-08'))
        .getList()
        .toJS(),
    ).toMatchObject(response.habitRecords.slice(0, 2));
  });
});
