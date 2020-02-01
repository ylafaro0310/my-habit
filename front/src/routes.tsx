import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Record from './pages/Record';
import HabitForm from './pages/HabitForm';

export const Path = {
  root: '/',
  records: '/records',
  habits: '/habits',
  statics: '/statics',
};

const routes = (
  <Switch>
    <Route exact path={Path.root} render={() => <Redirect to={Path.records} />} />
    <Route exact path={Path.records} component={Record} />
    <Route exact path={Path.habits} component={HabitForm} />
    <Redirect to={Path.records} />
  </Switch>
);

export default routes;
