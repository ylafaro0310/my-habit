import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';

import dayjs from '../../lib/dayjs-ja';
import { Analytics } from '../Analytics';
import Habits from '../../models/Habits';
import HabitRecords from '../../models/HabitRecords';

MockDate.set('2020-02-08');

const data = {
  habits: [
    { id: 1, habitName: '読書する', startedAt: dayjs() },
    { id: 2, habitName: '筋トレ', startedAt: dayjs() },
    { id: 3, habitName: '新しいCDを1枚聴く', startedAt: dayjs() },
  ],
  habitRecords: [
    { habitId: 2, completedAt: dayjs() },
    { habitId: 1, completedAt: dayjs('2020-01-08') },
  ],
};

const props = {
  habits: Habits.fromResponse(data),
  habitRecords: HabitRecords.fromResponse(data),
  match: {
    params: {
      habitId: 1,
    },
  },
  getHabitRecords: jest.fn(),
  addHabitRecord: jest.fn(),
  removeHabitRecord: jest.fn(),
};

describe('Page: HabitSessionForm', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(<Analytics {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
