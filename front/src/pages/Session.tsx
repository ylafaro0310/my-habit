import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import { State } from '../redux/store';
import HabitSessions from '../models/HabitSessions';
import { HabitSessionsActions } from '../redux/modules/HabitSessions';

type SessionProps = {
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
    const { habitSessions } = this.props;
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
              <ListItem key={key}>
                <div>{elem.workingMinutes + '分'}</div>
                <div>{dayjs(elem.completedAt).format('HH:mm')}</div>
              </ListItem>
            ))}
        </List>
      ));
    }
    return sessions ? sessions : null;
  }
}

export default connect((state: State) => ({
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
`;
