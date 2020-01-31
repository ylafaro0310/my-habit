import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import HabitList from '../components/HabitList';
import { State } from '../redux/store';
import { HabitsActions } from '../redux/modules/Habits';
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
class Record extends React.Component<RecordProps, RecordState> {
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
    const response = {
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
    dispatch(HabitsActions.getHabits(Habits.fromResponse(response)));
    dispatch(HabitRecordsActions.getHabitRecords(HabitRecords.fromResponse(response)));
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
