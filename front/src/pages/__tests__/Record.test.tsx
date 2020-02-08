import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import dayjs from 'dayjs';

import { Record } from '../Record';
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
  dispatch: jest.fn(),
};

describe('Page: Record', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(<Record {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('日付をクリックしたらStateが変更されること', () => {
    const wrapper = shallow(<Record {...props} />);
    const yesterday = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD');
    wrapper.find(`input[value='${yesterday}']`).simulate('change', {
      target: {
        value: yesterday,
      },
    });
    expect(wrapper.state('selectedDate')).toBe(yesterday);
  });
});
