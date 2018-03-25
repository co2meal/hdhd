import React from 'react'
import * as Redux from 'react-redux'
import * as RouterDOM from 'react-router-dom'
import * as RouterRedux from 'react-router-redux'
import * as UI from 'semantic-ui-react'

import AuthActions from 'actions/AuthActions'
import AuthService from 'services/AuthService'

import './AuthForm.css'

function mapStateToProps(state) {
  return {
    redirectToReferrer: !!state.auth.me,
  }
}

class SignIn extends React.Component {
  state = {
    isLoading: false,
    errorMessages: null,
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
    const { dispatch } = this.props
    if (nextProps.redirectToReferrer) {
      const { from } = nextProps.location.state || { from: { pathname: "/" } }
      dispatch(RouterRedux.push(from))
    }
  }

  handleSubmit(e) {
    const { form } = this.state
    const { dispatch } = this.props

    this.setState({ isLoading: true, errorMessages: null })
    AuthService.signIn(form).then(user => {
      dispatch(AuthActions.createSignInSuccess(user))
    }).catch(messages => {
      this.setState({
        errorMessages: messages,
        isLoading: false,
      })
    })
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
    const { isLoading, errorMessages } = this.state

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
              <UI.Form.Button color="teal" size="large" fluid> Log In </UI.Form.Button>
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

SignIn = Redux.connect(mapStateToProps)(SignIn)

export default SignIn
