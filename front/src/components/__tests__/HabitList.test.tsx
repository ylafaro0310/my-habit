import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import Habits from '../../models/Habits';
import HabitRecords from '../../models/HabitRecords';
import { HabitList } from '../HabitList';

const data = {
  habits: [
    { id: 1, habitName: '読書する' },
    { id: 2, habitName: '筋トレ' },
    { id: 3, habitName: '新しいCDを1枚聴く' },
  ],
  habitRecords: [
    { habitId: 2, completedAt: dayjs() },
    { habitId: 1, completedAt: dayjs('2020-01-08') },
  ],
};

const props = {
  habits: Habits.fromResponse(data),
  habitRecords: HabitRecords.fromResponse(data),
  selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
};

describe('Component: HabitList', () => {
  it('Snapshot test', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(<HabitList {...props} addHabitRecord={mockFn1} removeHabitRecord={mockFn2} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('習慣をチェックしたときaddHabitRecordが発行されること', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(<HabitList {...props} addHabitRecord={mockFn1} removeHabitRecord={mockFn2} />);
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(mockFn1.mock.calls.length).toBe(1);
  });
  it('習慣のチェックを外したときremoveHabitRecordが発行されること', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(<HabitList {...props} addHabitRecord={mockFn1} removeHabitRecord={mockFn2} />);
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(mockFn2.mock.calls.length).toBe(1);
  });
});
