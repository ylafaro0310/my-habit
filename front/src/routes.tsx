import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Record from './pages/Record';
import HabitForm from './pages/HabitForm';

export const Path = {
  root: '/',
  records: '/records',
  habits: '/habits',
  statics: '/statics',
};

const Container = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

const routes = (
  <Container>
    <Switch>
      <Route exact path={Path.root} render={() => <Redirect to={Path.records} />} />
      <Route exact path={Path.records} component={Record} />
      <Route exact path={Path.habits} component={HabitForm} />
      <Route exact path={Path.habits+"/:id(\\d+)"} component={HabitForm} />
      <Redirect to={Path.records} />
    </Switch>
  </Container>
);

export default routes;
