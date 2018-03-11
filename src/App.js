import React from 'react';
import * as RouterDOM from 'react-router-dom';
// import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

import Login from 'components/authentication/Login'
import Signup from 'components/authentication/Signup'
import ErrorPage404 from 'components/error/ErrorPage404'
import Dashboard from 'components/dashboard/Dashboard'
import authService from 'services/authentication/authService'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <RouterDOM.Switch>
        <RouterDOM.Redirect exact from='/' to='/dashboard' />

        <RouterDOM.Route path='/login' component={Login} />
        <RouterDOM.Route path='/signup' component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <RouterDOM.Route component={ErrorPage404} />
      </RouterDOM.Switch>
    )
  }
}

const PrivateRoute = ({component: InnerComponent, ...rest}) => (
  <RouterDOM.Route
    {...rest}
    render={props =>
      authService.isAuthenticated() ? (
        <InnerComponent {...props} />
      ) : (
        <RouterDOM.Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default App;
