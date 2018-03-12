import AT from 'constants/ActionTypes'
import AuthService from 'services/AuthService'

function createSignIn ({email, password}) {
  return (dispatch) => {
    dispatch(createSetIsLoading(true))
    AuthService.signIn({email, password}).then((res) => {
      return Promise.all([res.status !== 200, res.json()])
    }).then(([err, json]) => {
      dispatch(createSetIsLoading(false))
      if (err)
        return Promise.reject(json.messages)
      return json
    }).then((payload) => {
      dispatch(createSignInSuccess(payload))
    }).catch((messages) => {
      dispatch(createSignInFailure(messages))
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

function createSetIsLoading(isLoading) {
  return {
    type: AT.SET_LOADING,
    isLoading
  }
}

export default {
  createSignIn,
}
