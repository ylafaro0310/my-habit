import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Record from './pages/Record';
import HabitForm from './pages/HabitForm';
import HabitSessionForm from './pages/HabitSessionForm';
import Session from './pages/Session';

export const Path = {
  root: '/',
  records: '/records',
  habits: '/habits',
};

const Container = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

const routes = (
  <Container>
    <Switch>
      <Route
        exact
        path={Path.root}
        render={() => <Redirect to={Path.records} />}
      />
      <Route component={Record} exact path={Path.records} />
      <Route component={HabitForm} exact path={Path.habits} />
      <Route component={HabitForm} exact path={Path.habits + '/:id(\\d+)'} />
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
        path={Path.habits + '/:habitId(\\d+)/sessions/:habitSessionId(\\d+)'}
      />
      <Redirect to={Path.records} />
    </Switch>
  </Container>
);

export default routes;
