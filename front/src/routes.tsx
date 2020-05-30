import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Record from './pages/Record';
import Analytics from './pages/Analytics';
import HabitForm from './pages/HabitForm';
import HabitSessionForm from './pages/HabitSessionForm';
import Session from './pages/Session';
import Auth from './components/Auth';
import Login from './pages/Login';
import { connect } from 'react-redux';
import { AuthActions } from './redux/modules/Auth';
import { State } from './redux/store';
import Register from './pages/Register';

export const Path = {
  root: '/',
  login: '/login',
  register: '/register',
  records: '/records',
  habits: '/habits',
};

const Container = styled.div`
  background-color: #f9f9f9;
  height: 100%;
`;

type Props = {
  isLoggedIn: boolean | undefined
  errors: [],
  authCheck: Function;
};

class Routes extends React.Component<Props> {
  componentDidMount(){
    const {authCheck} = this.props;
    authCheck();
  }
  render(){
    const { isLoggedIn, errors } = this.props;
    return (
      isLoggedIn !== undefined 
      ? <Container>
      <Switch>
        <Route render={()=><Login isLoggedIn={isLoggedIn} errors={errors}/>} exact path={Path.login} />
        <Route render={()=><Register errors={errors}/>} exact path={Path.register} />
        <Auth isLoggedIn={isLoggedIn}>
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
    : <div style={{'display': 'flex','justifyContent': 'center'}}>Loading...</div>
    )
  }
}


export default connect((state:State)=>({
  isLoggedIn: state.auth.isLoggedIn,
  errors: state.auth.errors,
}),dispatch=>({
  authCheck: ()=>{dispatch(AuthActions.authCheck())}
}))(Routes)
