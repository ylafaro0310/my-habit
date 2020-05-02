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
      repeatValue: 0b1000001,
    },
    {
      id: 4,
      habitName: 'ゲーム',
      repeatType: 'week',
      repeatValue: 2,
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
  addHabitRecord: jest.fn(),
  removeHabitRecord: jest.fn(),
  toggleDisplayCompletedHabit: jest.fn(),
};

describe('Component: HabitList', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(<HabitList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  // ハンドラテスト
  it('習慣をチェックしたときaddHabitRecordが発行されること', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<HabitList {...props} addHabitRecord={mockFn} />);
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('習慣のチェックを外したときremoveHabitRecordが発行されること', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <HabitList {...props} removeHabitRecord={mockFn} />,
    );
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('達成済み表示/非表示ボタンをクリックしたときtoggleDisplayCompletedHabitが発行されること', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <HabitList {...props} toggleDisplayCompletedHabit={mockFn} />,
    );
    wrapper
      .find('#toggleDisplayCompletedHabit')
      .at(0)
      .simulate('click');
    expect(mockFn.mock.calls.length).toBe(1);
  });

  // repeatTypeごとの表示/非表示テスト
  // intervalまたは毎日(weekOfDay=127)の場合
  it('3日ごとの習慣を2日前または1日前に達成している場合のみに、習慣が非表示になること', () => {
    const customData = data;

    // 1日前に達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-07'),
    });
    const customProps = Object.assign({}, props);
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);

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
  // weekOfDayの場合
  it('曜日指定の習慣の場合、指定曜日の日のときのみ習慣が表示されること', () => {
    const customProps = Object.assign({}, props);
    // 水曜=非表示
    customProps['selectedDate'] = dayjs('2020-01-08').format('YYYY-MM-DD');
    let wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/新しいCDを1枚聴く/);

    // 土曜=表示
    customProps['selectedDate'] = dayjs('2020-01-04').format('YYYY-MM-DD');
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/新しいCDを1枚聴く/);

    // 日曜=表示
    customProps['selectedDate'] = dayjs('2020-01-05').format('YYYY-MM-DD');
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/新しいCDを1枚聴く/);
  });
  // weekの場合
  it('週に2回の習慣が既に達成済みのときに表示されないこと', () => {
    const customData = data;
    const customProps = Object.assign({}, props);

    // 2回達成済みの場合
    customData['habitRecords'].push({
      habitId: 4,
      completedAt: dayjs('2020-01-05'),
    });
    customData['habitRecords'].push({
      habitId: 4,
      completedAt: dayjs('2020-01-07'),
    });
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    let wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/ゲーム/);

    // 1回達成済みの場合
    customData['habitRecords'].pop();
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/ゲーム/);

    // 未達成の場合
    customData['habitRecords'].pop();
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/ゲーム/);
  });

  // 達成済み表示/非表示のテスト
  it('displayCompletedHabit=falseのとき、達成済みの習慣が表示されないこと', () => {
    const customData = data;

    // 達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-08'),
    });
    const customProps = Object.assign({}, props);
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    customProps['displayCompletedHabits'] = false;

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
    const customProps = Object.assign({}, props);
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    customProps['categoriesOfHabitsDisplayed'] = 'today';

    const wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).not.toMatch(/筋トレ/);
  });

  // カテゴリ選択の表示/非表示テスト
  it('categoriesOfHabitCompleted=allのとき、すべて習慣が表示されること', () => {
    const customData = data;

    // 1日前に達成している場合
    customData['habitRecords'].push({
      habitId: 2,
      completedAt: dayjs('2020-01-07'),
    });
    const customProps = Object.assign({}, props);
    customProps['habits'] = Habits.fromResponse(customData);
    customProps['habitRecords'] = HabitRecords.fromResponse(customData);
    customProps['categoriesOfHabitsDisplayed'] = 'all';

    const wrapper = shallow(<HabitList {...customProps} />).childAt(0);
    expect(wrapper.text()).toMatch(/筋トレ/);
  });
});
