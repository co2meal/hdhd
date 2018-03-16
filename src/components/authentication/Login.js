import React from 'react'
import * as Redux from 'react-redux'
import * as RouterDOM from 'react-router-dom'
import * as UI from 'semantic-ui-react'

import AuthActions from 'actions/AuthActions'

import './AuthForm.css'

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    redirectToReferrer: !!state.me,
    errorMessages: state.errorMessages,
  }
}

class Login extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
    },
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getHandleChange = this.getHandleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(AuthActions.createSignIn(this.state.form))
  }

  getHandleChange(field) {
    return (e) => {
      e.preventDefault()
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [field]: e.target.value,
        }
      })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } }
    const { redirectToReferrer, isLoading, errorMessages } = this.props

    if (redirectToReferrer) {
      return <RouterDOM.Redirect to={from} />
    }

    return (
      <UI.Grid textAlign="center" verticalAlign="middle">
        <UI.GridColumn>
          <UI.Header as='h2' icon>
            <UI.Icon name='user' />
            <UI.Header.Subheader>
              Log-in to your account
            </UI.Header.Subheader>
          </UI.Header>
          <UI.Form
            size="large" autoComplete="new-password"
            loading={isLoading}
            onSubmit={this.handleSubmit}
            error={!!errorMessages}>
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
              list={errorMessages}
            />
          </UI.Form>
          <UI.Message>
              New to us? <RouterDOM.Link to="/signup"> Sign Up </RouterDOM.Link>
          </UI.Message>
        </UI.GridColumn>
      </UI.Grid>
    )
  }
}

Login = Redux.connect(mapStateToProps)(Login)

export default Login
