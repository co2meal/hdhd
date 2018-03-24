import * as RouterRedux from 'react-router-redux'

import AT from 'constants/ActionTypes'
import AuthService from 'services/AuthService'

/**
 * Use redux-thunk when dispatching is required for processing promise.
 */

function createSignIn(payload) {
  return (dispatch) => {
    dispatch(createSetIsLoading(true))
    AuthService.signIn(payload).then((res) => {
      return Promise.all([res.status !== 200, res.json()])
    }).then(([err, json]) => {
      if (err)
        return Promise.reject(json.messages)
      return json
    }).then((payload) => {
      dispatch(createSignInSuccess(payload))
    }).catch((messages) => {
      dispatch(createSignInFailure(messages))
    }).finally(() => {
      dispatch(createSetIsLoading(false))
    })
  }
}

function createSignUp(payload) {
  return (dispatch) => {
    dispatch(createSetIsLoading(true))
    AuthService.signUp(payload).then((res) => {
      return Promise.all([res.status !== 200, res.json()])
    }).then(([err, json]) => {
      if (err)
        return Promise.reject(json.messages)
      return json
    }).then((payload) => {
      dispatch(createSignUpSuccess(payload))
      dispatch(RouterRedux.push('/welcome'))
    }).catch((messages) => {
      dispatch(createSignUpFailure(messages))
    }).finally(() => {
      dispatch(createSetIsLoading(false))
    })
  }
}

function createSignInSuccess(user) {
  return {
    type: AT.SIGN_IN_SUCCESS,
    user
  }
}

function createSignInFailure(messages) {
  return {
    type: AT.SIGN_IN_FAILURE,
    messages
  }
}

function createSignUpSuccess(user) {
  return {
    type: AT.SIGN_UP_SUCCESS,
    user
  }
}

function createSignUpFailure(messages) {
  return {
    type: AT.SIGN_UP_FAILURE,
    messages
  }
}

function createSetIsLoading(isLoading) {
  return {
    type: AT.SET_LOADING,
    isLoading
  }
}

export default {
  createSignIn,
  createSignUp,
}
