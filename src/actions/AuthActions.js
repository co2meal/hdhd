import AT from 'constants/ActionTypes'

function createSignInSuccess(user) {
  return {
    type: AT.SIGN_IN_SUCCESS,
    user,
  }
}

export default {
  createSignInSuccess,
}
