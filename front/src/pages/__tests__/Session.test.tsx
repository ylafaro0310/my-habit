import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';

import dayjs from '../../lib/dayjs-ja';
import { Session } from '../Session';
import Habits from '../../models/Habits';
import HabitRecords from '../../models/HabitRecords';
import HabitSessions from '../../models/HabitSessions';

MockDate.set('2020-02-08');

const data = {
  habits: [
    { id: 1, habitName: '読書する', startedAt: dayjs() },
    { id: 2, habitName: '筋トレ', startedAt: dayjs() },
    { id: 3, habitName: '新しいCDを1枚聴く', startedAt: dayjs() },
  ],
  habitSessions: [
    { habitId: 2, workingMinutes: 5, completedAt: dayjs() },
    { habitId: 1, workingMinutes: 10, completedAt: dayjs('2020-01-08') },
  ],
};

const props = {
  habits: Habits.fromResponse(data),
  habitSessions: HabitSessions.fromResponse(data),
  match: {
    params: {
      id: 1,
    },
  },
  dispatch: jest.fn(),
};

describe('Page: Session', () => {
  it('Snapshot test', () => {
    const wrapper = shallow(<Session {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
