import React from 'react';
import _ from 'lodash';
import * as RouterDOM from 'react-router-dom';
import * as UI from 'semantic-ui-react';
import authService from 'services/authentication/authService.js'
import './Login.css'

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    errorMessages: [],
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getHandleChange = this.getHandleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    authService.login(this.state, (err, data) => {
      if (err) {
        this.setState({
          errorMessages: [...this.state.errorMessages, ...data.messages],
        })
      } else {
        this.setState({
          redirectToReferrer: !err,
        })
      }
    })
  }

  getHandleChange(field) {
    return ((e) => {
      e.preventDefault()
      this.setState({[field]: e.target.value})
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <RouterDOM.Redirect to={from} />;
    }

    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <UI.Header as='h2' icon>
            <UI.Icon name='user' />
            <UI.Header.Subheader>
              Log-in to your account
            </UI.Header.Subheader>
          </UI.Header>
          <UI.Form
            size="large"autoComplete="new-password"
            onSubmit={this.handleSubmit} error={!_.isEmpty(this.state.errorMessages)}>
            <UI.Segment>
              <UI.Form.Input
                onChange={this.getHandleChange('email')} placeholder="E-mail address" type="email"
                iconPosition="left" icon="user" />
              <UI.Form.Input
                onChange={this.getHandleChange('password')} placeholder="password" type="password"
                iconPosition="left" icon="lock" autoComplete="new-password" />
              <UI.Form.Button color="teal" size="large" fluid> Login </UI.Form.Button>
            </UI.Segment>
            <UI.Message
              error
              list={this.state.errorMessages}
            />
          </UI.Form>
          <UI.Message>
              New to us? <RouterDOM.Link to="/signup"> Sign Up </RouterDOM.Link>
          </UI.Message>
        </div>
      </div>
    )
  }
}

export default Login;
// export default autofill(Login);
