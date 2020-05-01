import React from 'react';
import { shallow } from 'enzyme';

import dayjs from '../../lib/dayjs-ja';
import Habits from '../../models/Habits';
import HabitRecords from '../../models/HabitRecords';
import { HabitList } from '../HabitList';

const data = {
  habits: [
    {
      id: 1,
      habitName: '読書する',
      repeatType: 'dayOfWeek',
      repeatValue: 127,
    },
    {
      id: 2,
      habitName: '筋トレ',
      repeatType: 'interval',
      repeatValue: 3,
    },
    {
      id: 3,
      habitName: '新しいCDを1枚聴く',
      repeatType: 'dayOfWeek',
      repeatValue: 127,
    },
  ],
  habitRecords: [
    { habitId: 2, completedAt: dayjs() },
    { habitId: 1, completedAt: dayjs('2020-01-08') },
    { habitId: 1, completedAt: dayjs('2020-01-07') },
  ],
};

const props = {
  habits: Habits.fromResponse(data),
  habitRecords: HabitRecords.fromResponse(data),
  selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
  categoriesOfHabitsDisplayed: 'today',
  displayCompletedHabits: true,
};

describe('Component: HabitList', () => {
  it('Snapshot test', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(
      <HabitList
        {...props}
        addHabitRecord={mockFn1}
        removeHabitRecord={mockFn2}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('習慣をチェックしたときaddHabitRecordが発行されること', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(
      <HabitList
        {...props}
        addHabitRecord={mockFn1}
        removeHabitRecord={mockFn2}
      />,
    );
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(mockFn1.mock.calls.length).toBe(1);
  });
  it('習慣のチェックを外したときremoveHabitRecordが発行されること', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const wrapper = shallow(
      <HabitList
        {...props}
        addHabitRecord={mockFn1}
        removeHabitRecord={mockFn2}
      />,
    );
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(mockFn2.mock.calls.length).toBe(1);
  });
  it('3日ごとの習慣を2日前または1日前に達成している場合のみに、習慣が非表示になること', () => {
    const customData = data;

    // 1日前に達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-07'),
    });
    const customProps = {
      habits: Habits.fromResponse(customData),
      habitRecords: HabitRecords.fromResponse(customData),
      selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
      categoriesOfHabitsDisplayed: 'today',
      displayCompletedHabits: false,
      addHabitRecord: jest.fn(),
      removeHabitRecord: jest.fn(),
    };
    let wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/筋トレ/);

    // 2日前に達成している場合
    customData['habitRecords'].pop();
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-06'),
    });
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/筋トレ/);

    // 3日前に達成している場合
    customData['habitRecords'].pop();
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-05'),
    });
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/筋トレ/);
  });
  it('displayCompletedHabit=falseのとき、達成済みの習慣が表示されないこと', () => {
    const customData = data;

    // 達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-08'),
    });
    const customProps = {
      habits: Habits.fromResponse(customData),
      habitRecords: HabitRecords.fromResponse(customData),
      selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
      categoriesOfHabitsDisplayed: 'today',
      displayCompletedHabits: false,
      addHabitRecord: jest.fn(),
      removeHabitRecord: jest.fn(),
    };
    let wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/筋トレ/);

    // 達成していない場合
    customData['habitRecords'].pop();
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/筋トレ/);
  });
  it('categoriesOfHabitCompleted=todayのとき、今日やるべき習慣のみが表示されること', () => {
    const customData = data;

    // 1日前に達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-07'),
    });
    const customProps = {
      habits: Habits.fromResponse(customData),
      habitRecords: HabitRecords.fromResponse(customData),
      selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
      categoriesOfHabitsDisplayed: 'today',
      displayCompletedHabits: false,
      addHabitRecord: jest.fn(),
      removeHabitRecord: jest.fn(),
    };
    const wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/筋トレ/);
  });
  it('categoriesOfHabitCompleted=allのとき、すべて習慣が表示されること', () => {
    const customData = data;

    // 1日前に達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-07'),
    });
    const customProps = {
      habits: Habits.fromResponse(customData),
      habitRecords: HabitRecords.fromResponse(customData),
      selectedDate: dayjs('2020-01-08').format('YYYY-MM-DD'),
      categoriesOfHabitsDisplayed: 'all',
      displayCompletedHabits: false,
      addHabitRecord: jest.fn(),
      removeHabitRecord: jest.fn(),
    };
    const wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/筋トレ/);
  });
});
