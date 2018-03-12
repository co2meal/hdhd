import React from 'react';

import * as RouterDOM from 'react-router-dom';
import * as UI from 'semantic-ui-react';

import AuthService from 'services/AuthService.js'

import './AuthForm.css'
class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConrimation: '',
    username: '',

    errorMessages: [],
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getHandleChange = this.getHandleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    AuthService.signup(this.state, (err) => this.setState({}))
  }

  getHandleChange(field) {
    return ((e) => {
      e.preventDefault()
      this.setState({[field]: e.target.value})
    })
  }

  render() {
    return (
      <UI.Grid textAlign="center" verticalAlign="middle">
        <UI.GridColumn>
          <UI.Header as='h2' icon>
            <UI.Icon name='user' />
            <UI.Header.Subheader>
              Signup
            </UI.Header.Subheader>
          </UI.Header>
          <UI.Form size="large" onSubmit={this.handleSubmit}>
            <UI.Segment>
              <UI.Form.Input
                label="E-Mail"
                onChange={this.getHandleChange('email')} placeholder="E-mail address" type="email"
                iconPosition="left" icon="user" />
              <UI.Form.Group widths='equal'>
                <UI.Form.Input
                  label="Password"
                  onChange={this.getHandleChange('password')} placeholder="Password" type="password"
                  iconPosition="left" icon="lock" />
                <UI.Form.Input
                  label="Password Confirmation"
                  onChange={this.getHandleChange('passwordConrimation')} placeholder="Password Confirmation" type="password"
                  iconPosition="left" icon="lock" />
              </UI.Form.Group>
            </UI.Segment>
            <UI.Segment>
              <UI.Form.Input
                  label="Username"
                  onChange={this.getHandleChange('username')} placeholder="Username" type="text"
                  iconPosition="left" icon="user" />
              <UI.Form.Button color="teal" size="large" fluid> Register </UI.Form.Button>
            </UI.Segment>
            <UI.Message error />
          </UI.Form>
          <UI.Message>
              Do you have an account already? <br />
              <RouterDOM.Link to="/login"> Go to Login </RouterDOM.Link>
              or <RouterDOM.Link to="/password"> Find your password </RouterDOM.Link>
          </UI.Message>
        </UI.GridColumn>
      </UI.Grid>
    )
  }
}

export default Signup;
