import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { State } from '../redux/store';
import dayjs from '../lib/dayjs-ja';
import StyledCard from '../components/Card';
import Habits, { Habit } from '../models/Habits';
import HabitRecords from '../models/HabitRecords';
import { HabitRecordsActions } from '../redux/modules/HabitRecords';
import { HabitSessionsActions } from '../redux/modules/HabitSessions';
import HabitHeader from '../components/HabitHeader';
import HabitSessions from '../models/HabitSessions';

type AnalyticsProps = {
  habits: Habits;
  habitRecords: HabitRecords;
  habitSessions: HabitSessions;
  getHabitRecords: () => void;
  getHabitSessions: (habitId: number) => void;
  addHabitRecord: (params: object) => void;
  removeHabitRecord: (params: object) => void;
} & RouteComponentProps<{ habitId: string }>;

type AnalyticsState = {
  month: number;
};
export class Analytics extends React.Component<AnalyticsProps, AnalyticsState> {
  constructor(props: AnalyticsProps) {
    super(props);
    this.state = {
      month: Number(dayjs().format('M')),
    };
    this.onChangeMongh = this.onChangeMongh.bind(this);
    this.onChangeHabitRecord = this.onChangeHabitRecord.bind(this);
  }

  onChangeMongh(add = true): void {
    const { month } = this.state;
    if (add) {
      this.setState({ month: month + 1 });
    } else {
      this.setState({ month: month - 1 });
    }
  }

  onChangeHabitRecord = (
    event: React.ChangeEvent<HTMLInputElement>,
    habitId: number,
    selectedDate: string,
  ): void => {
    const { addHabitRecord, removeHabitRecord } = this.props;
    if (event.target.checked) {
      const params = {
        habitId,
        completedAt: selectedDate,
        isSkipped: false,
      };
      addHabitRecord(params);
    } else {
      const params = {
        habitId,
        completedAt: selectedDate,
      };
      removeHabitRecord(params);
    }
  };

  calendar(month: number) {
    const { habitId } = this.props.match.params;
    const { habits, habitRecords } = this.props;
    const habit = habits.getById(Number(habitId));
    const dateMonth = dayjs().set('month', month);
    const startOfDay = dateMonth.startOf('month');
    const endOfDay = dateMonth.endOf('month');
    let date = dateMonth.startOf('month');
    let tr = [];
    const tbody = [];
    for (let i = 0; !date.isAfter(endOfDay); i++) {
      tr = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startOfDay.day()) || date.isAfter(endOfDay)) {
          tr.push(<td align='center' key={j}></td>);
          continue;
        }
        const dateFormat = date.format('YYYY-MM-DD');
        tr.push(
          <td align='center' key={j}>
            <input
              checked={habit ? habit.isCompleted(date, habitRecords) : false}
              id={dateFormat}
              onChange={e => {
                this.onChangeHabitRecord(e, Number(habitId), dateFormat);
              }}
              type='checkbox'
            />
            <label htmlFor={dateFormat}>{date.format('D')}</label>
          </td>,
        );
        date = date.add(1, 'd');
      }
      tbody.push(<tr key={i}>{tr}</tr>);
    }
    return (
      <>
        <CalHeader>
          <div
            onClick={() => {
              this.onChangeMongh(false);
            }}
          >
            <span className='fas fa-angle-left' />
          </div>
          <div>
            {dayjs()
              .set('month', month)
              .format('YYYY年MM月')}
          </div>
          <div
            onClick={() => {
              this.onChangeMongh(true);
            }}
          >
            <span className='fas fa-angle-right' />
          </div>
        </CalHeader>
        <Table>
          <thead>
            <tr>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </Table>
      </>
    );
  }

  achievement(habit: Habit, habitSessions: HabitSessions){
    const { getHabitSessions } = this.props;
    let goalAchievement = 0;
    if(!habitSessions){
      getHabitSessions(habit.id);
    }else{
      goalAchievement = habitSessions.getList().filter((elem)=>(dayjs().isSame(elem.completedAt,'month'))).count();
    }
    return (
      <div>
        {
        habitSessions
        ? goalAchievement + '/' + habit.numericalGoal + ' ' + habit.numericalGoalUnit
        : '読み込み中'
        }
      </div>
    )
  }

  componentDidMount() {
    const { getHabitRecords } = this.props;
    getHabitRecords();
  }

  render() {
    const { habits, habitSessions } = this.props;
    const { habitId } = this.props.match.params;
    const habit = habits.getById(Number(habitId));
    return (
      habit
      ? <>
        <HabitHeader
          backTo='/records'
          habitName={habit ? habit.habitName : ''}
        />
        <StyledCard>{this.achievement(habit, habitSessions)}</StyledCard>
        <StyledCard>{this.calendar(this.state.month - 1)}</StyledCard>
      </>
      : '読み込み中'
    );
  }
}

export default connect(
  (state: State) => ({
    habits: state.habits,
    habitRecords: state.habitRecords,
    habitSessions: state.habitSessions,
  }),
  dispatch => ({
    getHabitRecords: (): void => {
      dispatch(HabitRecordsActions.getHabitRecords({}));
    },
    getHabitSessions: (habitId: number): void => {
      dispatch(HabitSessionsActions.getHabitSessions({habitId}));
    },
    addHabitRecord: (params: object): void => {
      dispatch(HabitRecordsActions.addHabitRecord(params));
    },
    removeHabitRecord: (params: object): void => {
      dispatch(HabitRecordsActions.removeHabitRecord(params));
    },
  }),
)(Analytics);

const CalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  &:nth-child(1),
  :nth-child(3) {
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-spacing: 0;
  & input {
    display: none;
  }
  & td {
  }
  & td > label {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }
  & td > input:checked ~ label {
    background: #2196f3;
    border-radius: 50%;
  }
`;
