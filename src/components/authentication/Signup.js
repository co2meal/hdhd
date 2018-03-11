import React from 'react';
import * as RouterDOM from 'react-router-dom';
import * as UI from 'semantic-ui-react';
import authService from 'services/authentication/authService.js'
import './Login.css'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getHandleChange = this.getHandleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    authService.login(this.state, (success) => this.setState({redirectToReferrer: success}))
  }

  getHandleChange(field) {
    return ((e) => {
      e.preventDefault()
      this.setState({[field]: e.target.value})
    })
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <UI.Header as='h2' icon>
            <UI.Icon name='user' />
            <UI.Header.Subheader>
              Signup
            </UI.Header.Subheader>
          </UI.Header>
          <UI.Form size="large" onSubmit={this.handleSubmit} autoComplete="new-password">
            <UI.Segment>
              <UI.Form.Input
                onChange={this.getHandleChange('email')} placeholder="E-mail address" type="email"
                iconPosition="left" icon="user" />
              <UI.Form.Input
                onChange={this.getHandleChange('password')} placeholder="password" type="password"
                iconPosition="left" icon="lock" autoComplete="new-password" />
              <UI.Form.Button color="teal" size="large" fluid> Login </UI.Form.Button>
            </UI.Segment>
            <UI.Message error />
          </UI.Form>
          <UI.Message>
              New to us? <RouterDOM.Link to="/signup"> Sign Up </RouterDOM.Link>
          </UI.Message>
        </div>
      </div>
    );
  }
}

export default Login;
// export default autofill(Login);
