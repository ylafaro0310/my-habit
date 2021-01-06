import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import { State } from '../redux/store';
import HabitSessions from '../models/HabitSessions';
import { HabitSessionsActions } from '../redux/modules/HabitSessions';
import HabitHeader from '../components/HabitHeader';
import Habits from '../models/Habits';

type SessionProps = {
  habits: Habits;
  habitSessions: HabitSessions;
  dispatch: Dispatch;
} & RouteComponentProps<{ habitId: string }>;
export class Session extends React.Component<SessionProps> {
  componentDidMount() {
    const { habitId } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(
      HabitSessionsActions.getHabitSessions({
        habitId: Number(habitId),
      }),
    );
  }

  render() {
    const { habitId } = this.props.match.params;
    const { habits, habitSessions } = this.props;
    let sessions;
    if (habitSessions) {
      let keys = habitSessions
        .getList()
        .map(elem => dayjs(elem.completedAt).format('YYYY-MM-DD'));
      keys = keys.filter((v, i, self) => self.indexOf(v) === i);
      keys = keys.sort((a, b) => (dayjs(a).isBefore(dayjs(b)) ? 1 : -1));
      sessions = keys.map((date, key) => (
        <List key={key}>
          <ListLabel>{date}</ListLabel>
          {habitSessions
            .getList()
            .filter(
              elem => dayjs(elem.completedAt).format('YYYY-MM-DD') === date,
            )
            .sort((a, b) =>
              dayjs(a.completedAt).isAfter(dayjs(b.completedAt)) ? 1 : -1,
            )
            .map((elem, key) => (
              <CustomLink key={key}>
                <Link to={'/habits/' + elem.habitId + '/sessions/' + elem.id}>
                  <ListItem>
                    <div>{'【作業時間】' + elem.workingMinutes + '分'}</div>
                    {elem.numericalGoal && <div>{'【数値目標】' + elem.numericalGoal + (habits.getList().find((elem)=>(elem.id === Number(habitId))) || {}).numericalGoalUnit}</div>}
                    <div>{dayjs(elem.completedAt).format('HH:mm')}</div>
                  </ListItem>
                </Link>
              </CustomLink>
            ))}
        </List>
      ));
    }
    return (
      <>
        <HabitHeader
          backTo={'/records'}
          habitName={
            habits
              ? habits.getList().find(elem => elem.id === Number(habitId))
                  ?.habitName || ''
              : ''
          }
          nextTo={'/habits/' + habitId + '/sessions'}
        />
        {sessions ? sessions : null}
      </>
    );
  }
}

const CustomLink = styled.div`
  & a {
    text-decoration: none;
    color: black;
  }
  & a:visited {
    color: black;
  }
`;

export default connect((state: State) => ({
  habits: state.habits,
  habitSessions: state.habitSessions,
}))(Session);

const List = styled.div`
  width: 100%;
`;
const ListLabel = styled.div`
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  background: #999;
  font-weight: 500;
`;
const ListItem = styled.div`
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #999;
`;
