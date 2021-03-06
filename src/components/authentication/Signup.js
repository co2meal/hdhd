import React from 'react'
import * as Redux from 'react-redux'
import * as RouterDOM from 'react-router-dom'
import * as RouterRedux from 'react-router-redux'
import * as UI from 'semantic-ui-react'

import AuthService from 'services/AuthService'

import './AuthForm.css'

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading,
    errorMessages: state.auth.errorMessages,
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      errorMessages: null,
      form: {
        email: '',
        password: '',
        passwordConrimation: '',
        username: '',
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getHandleChange = this.getHandleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const { form } = this.state
    const { dispatch } = this.props

    this.setState({ isLoading: true, errorMessages: null })
    AuthService.signUp(form).then(() => {
      dispatch(RouterRedux.push('/welcome'))
    }).catch(messages => {
      this.setState({ errorMessages: messages })
    }).then(() => {
      this.setState({ isLoading: false })
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
        },
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
              Signup
            </UI.Header.Subheader>
          </UI.Header>
          <UI.Form
            size="large" autoComplete="new-password"
            loading={isLoading}
            onSubmit={this.handleSubmit}
            error={!!errorMessages}>
            <UI.Segment>
              <UI.Form.Input
                label="E-Mail"
                onChange={this.getHandleChange('email')} placeholder="E-mail address" type="email"
                iconPosition="left" icon="user" />
              <UI.Form.Group widths='equal'>
                <UI.Form.Input
                  label="Password"
                  onChange={this.getHandleChange('password')} placeholder="Password" type="password"
                  iconPosition="left" icon="lock" disabled />
                <UI.Form.Input
                  label="Password Confirmation"
                  onChange={this.getHandleChange('passwordConrimation')} placeholder="Password Confirmation" type="password"
                  iconPosition="left" icon="lock" disabled />
              </UI.Form.Group>
            </UI.Segment>
            <UI.Segment>
              <UI.Form.Input
                label="Username"
                onChange={this.getHandleChange('username')} placeholder="Username" type="text"
                iconPosition="left" icon="user" />
              <UI.Form.Button color="teal" size="large" fluid> Register </UI.Form.Button>
            </UI.Segment>
            <UI.Message
              error
              list={errorMessages}
            />
          </UI.Form>
          <UI.Message>
            Do you have an account already? <br />
            <RouterDOM.Link to="/signin"> Go to Login </RouterDOM.Link>
            or <RouterDOM.Link to="/password"> Find your password </RouterDOM.Link>
          </UI.Message>
        </UI.GridColumn>
      </UI.Grid>
    )
  }
}

Signup = Redux.connect(mapStateToProps)(Signup)

export default Signup
