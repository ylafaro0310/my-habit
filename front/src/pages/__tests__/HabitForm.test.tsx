import React from 'react';
import { shallow } from 'enzyme';

import { HabitForm } from '../HabitForm';

const mockfn1 = jest.fn();
const mockfn2 = jest.fn();
const props = {
  repeatTypeValue: 'dayOfWeek',
  handleSubmit: mockfn1,
  resetRepeatValue: mockfn2,
};

describe('Page: HabitForm', () => {
  it('Snapshot test', () => {
    let wrapper = shallow(<HabitForm {...props} repeatTypeValue='dayOfWeek' />);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<HabitForm {...props} repeatTypeValue='week' />);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<HabitForm {...props} repeatTypeValue='interval' />);
    expect(wrapper).toMatchSnapshot();
  });
  it('repeatTypeを変更したらresetRepeatValueが呼ばれること', () => {
    const wrapper = shallow(<HabitForm {...props} repeatTypeValue='dayOfWeek' />);
    wrapper.find('Field[name="repeatType"]').simulate('change', { target: { value: 'week' } });
    expect(mockfn2.mock.calls.length).toBe(1);
  });
});
