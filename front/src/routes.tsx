import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Record from './pages/Record';
import Analytics from './pages/Analytics';
import HabitForm from './pages/HabitForm';
import HabitSessionForm from './pages/HabitSessionForm';
import Session from './pages/Session';
import Auth from './components/Auth';
import Login from './pages/Login';
import { State } from './redux/store';

export const Path = {
  root: '/',
  login: '/login',
  records: '/records',
  habits: '/habits',
};

const Container = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

type Props = {
  isLoggedIn: boolean | undefined;
};
const routes: React.FC<Props> = ({ isLoggedIn }) =>
  isLoggedIn !== undefined ? (
    <Container>
      <Switch>
        <Route component={Login} exact path={Path.login} />
        <Auth isLoggedIn={false}>
          <Route
            exact
            path={Path.root}
            render={() => <Redirect to={Path.records} />}
          />
          <Route component={Record} exact path={Path.records} />
          <Route
            component={Analytics}
            exact
            path={Path.records + '/:habitId(\\d+)'}
          />
          <Route component={HabitForm} exact path={Path.habits} />
          <Route
            component={HabitForm}
            exact
            path={Path.habits + '/:id(\\d+)'}
          />
          <Route
            component={Session}
            exact
            path={Path.habits + '/:habitId(\\d+)/sessions/list'}
          />
          <Route
            component={HabitSessionForm}
            exact
            path={Path.habits + '/:habitId(\\d+)/sessions/'}
          />
          <Route
            component={HabitSessionForm}
            exact
            path={
              Path.habits + '/:habitId(\\d+)/sessions/:habitSessionId(\\d+)'
            }
          />
          <Redirect to={Path.records} />
        </Auth>
      </Switch>
    </Container>
  ) : (
    <div>Loading...</div>
  );

export default connect((state: State) => ({
  isLoggedIn: state.auth.isLoggedIn,
}))(routes);
