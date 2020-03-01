import dayjs from '../../lib/dayjs-ja';
import HabitRecords from '../HabitRecords';

const response = {
  habits: [
    { id: 1, habitName: '読書する' },
    { id: 2, habitName: '筋トレ' },
    { id: 3, habitName: '新しいCDを1枚聴く' },
  ],
  habitRecords: [
    { habitId: 2, completedAt: '2020-01-08 00:00:00', isSkipped: false },
    { habitId: 1, completedAt: '2020-01-08 00:00:00', isSkipped: false },
    { habitId: 1, completedAt: '2020-01-09 00:00:00', isSkipped: false },
  ],
};

const expectedData = [
  { habitId: 2, completedAt: dayjs('2020-01-08 00:00:00'), isSkipped: false },
  { habitId: 1, completedAt: dayjs('2020-01-08 00:00:00'), isSkipped: false },
  { habitId: 1, completedAt: dayjs('2020-01-09 00:00:00'), isSkipped: false },
];

describe('Class HabitRecords', () => {
  const habitRecords = HabitRecords.fromResponse(response);
  it('.getList()', () => {
    expect(habitRecords.getList().toJS()).toMatchObject(expectedData);
  });
  it('.filterById()', () => {
    expect(
      habitRecords
        .filterById(2)
        .getList()
        .toJS(),
    ).toMatchObject([expectedData[0]]);
  });
  it('.filterByCompletedAt()', () => {
    expect(
      habitRecords
        .filterByCompletedAt(dayjs('2020-01-08'))
        .getList()
        .toJS(),
    ).toMatchObject(expectedData.slice(0, 2));
  });
});
