import React from 'react'
import * as Redux from 'react-redux'
import * as RouterDOM from 'react-router-dom'
import * as RouterRedux from 'react-router-redux'
import * as UI from 'semantic-ui-react'

import AuthActions from 'actions/AuthActions'

import './AuthForm.css'

function mapStateToProps(state) { // Replace it to thunk.
  return {
    isLoading: state.auth.isLoading,
    redirectToReferrer: !!state.auth.me,
    errorMessages: state.auth.errorMessages,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectToReferrer) {
      const { from } = nextProps.location.state || { from: { pathname: "/" } }
      this.props.dispatch(RouterRedux.push(from))
    }
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
    const { isLoading, errorMessages } = this.props

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
            size="large"
            loading={isLoading}
            onSubmit={this.handleSubmit}
            error={!!errorMessages}>
            <UI.Segment>
              <UI.Form.Input
                onChange={this.getHandleChange('email')} placeholder="E-mail address" type="email"
                iconPosition="left" icon="user" />
              <UI.Form.Input
                onChange={this.getHandleChange('password')} placeholder="password" type="password"
                iconPosition="left" icon="lock" />
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
