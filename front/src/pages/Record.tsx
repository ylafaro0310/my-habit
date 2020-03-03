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
import Card from '../components/Card';
import { Link } from 'react-router-dom';

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
    
    const element = document.getElementById('datelist');
    if (element) {
      element.scrollLeft = element.scrollWidth;
    }
  }

  render() {
    const { selectedDate } = this.state;
    const { habits, habitRecords } = this.props;
    const date = [];
    const startOfMonth = dayjs()
      .subtract(1, 'month')
      .add(1, 'day');
    const endOfMonth = dayjs().add(1, 'day');
    for (let i = startOfMonth; !i.isAfter(endOfMonth); i = i.add(1, 'day')) {
      date.push(
        <Date>
          <input
            type='radio'
            name='date'
            value={i.format('YYYY-MM-DD')}
            id={i.format('YYYY-MM-DD')}
            checked={dayjs(selectedDate).isSame(i, 'd')}
            onChange={this.onChangeDate}
          />
          <label htmlFor={i.format('YYYY-MM-DD')}>
            <div>
              <div>{i.format('ddd')}</div>
              <div>{i.format('D')}</div>
            </div>
          </label>
        </Date>,
      );
    }
    return (
      <div className='App'>
        <Card>
          <div className='date'>
            <Header>
              <div>{dayjs(selectedDate).format('M月D日')}</div>
              <Link to='habits' className='no-decoration'>
                <FAButton/>
              </Link>
            </Header>
            <DateList id='datelist'>
              {date.map((elem, key) => (
                <li key={key}>{elem}</li>
              ))}
            </DateList>
          </div>
        </Card>
        <HabitList habits={habits} habitRecords={habitRecords} selectedDate={selectedDate} />
      </div>
    );
  }
}

export default connect((state: State) => ({
  habits: state.habits,
  habitRecords: state.habitRecords,
}))(Record);

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.7em;
`;
const FAButton = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  background: #03a9f4;
  text-align: center;
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  &:before {
    position: relative;
    top: 20%;
    color: #ffffff;
    content: '+';
  }
`;

const DateList = styled.ul`
  display: flex;
  overflow-x: scroll;
  padding-left: 0.5em;
  margin: 0.7em;

  & li {
    display: inline-block;
  }
`;

const Date = styled.div`
  margin-right: 5px;
  width: 2.5em;
  background-color: #f9f9f9;

  & input {
    display: none;
  }

  & label {
    text-align: center;
  }
  & label > div {
    border: 1px solid #f0f0f0;
    border-radius: 5px 5px;
  }

  & input:checked + label {
    color: #2196f3;
  }
  & input:checked + label > div {
    border-color: #2196f3;
  }
`;
