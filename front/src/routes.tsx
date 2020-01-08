import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Record from './components/Record';

export const Path = {
  root: '/',
  records: '/records',
  statics: '/statics',
};

const routes = (
  <Switch>
    <Route exact path={Path.root} render={()=>(<Redirect to={Path.records}/>)} />
    <Route exact path={Path.records} component={Record} />
    <Redirect to={Path.records} />
  </Switch>
);

export default routes;