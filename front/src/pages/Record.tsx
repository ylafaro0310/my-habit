import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import dayjs from '../lib/dayjs-ja';
import HabitList from '../components/HabitList';
import { State } from '../redux/store';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';
import Habits from '../models/Habits';
import HabitRecords from '../models/HabitRecords';

interface RecordProps {
  habits: Habits;
  habitRecords: HabitRecords;
  dispatch: Dispatch;
}
interface RecordState {
  selectedDate: string;
}
export class Record extends React.Component<RecordProps, RecordState> {
  constructor(props: RecordProps) {
    super(props);
    this.state = {
      selectedDate: dayjs().format('YYYY-MM-DD'),
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  onChangeDate(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    this.setState({ selectedDate: value });
  }

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(HabitRecordsActions.getHabitRecords({}));
  }

  render() {
    const { selectedDate } = this.state;
    const { habits, habitRecords } = this.props;
    const date = [];
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');
    for (let i = startOfMonth; !i.isAfter(endOfMonth); i = i.add(1, 'day')) {
      date.push(
        <div>
          <input
            type='radio'
            name='date'
            value={i.format('YYYY-MM-DD')}
            id={i.format('YYYY-MM-DD')}
            checked={dayjs(selectedDate).isSame(i, 'd')}
            onChange={this.onChangeDate}
          />
          <label htmlFor={i.format('YYYY-MM-DD')}>{i.format('MM/DD')}</label>
        </div>,
      );
    }
    return (
      <div className='App'>
        <div className='date'>
          <button>習慣を追加する</button>
          <DateList>
            {date.map((elem, key) => (
              <li key={key}>{elem}</li>
            ))}
          </DateList>
        </div>
        <HabitList habits={habits} habitRecords={habitRecords} selectedDate={selectedDate} />
      </div>
    );
  }
}

export default connect((state: State) => ({
  habits: state.habits,
  habitRecords: state.habitRecords,
}))(Record);

const DateList = styled.ul`
  & li {
    display: inline-block;
  }
`;
