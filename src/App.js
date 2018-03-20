import React from 'react';
import * as Redux from 'react-redux'
import * as RouterDOM from 'react-router-dom';

import Login from 'components/authentication/Login'
import Signup from 'components/authentication/Signup'
import ErrorPage404 from 'components/error/ErrorPage404'
import Dashboard from 'components/dashboard/Dashboard'
import './App.css';

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.me,
  }
}

class PrivateRoute extends React.Component {
  render() {
    const {isAuthenticated, component: InnerComponent, ...rest} = this.props

    return (
      <RouterDOM.Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
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
  }
}
PrivateRoute = Redux.connect(mapStateToProps)(PrivateRoute)

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

export default App
