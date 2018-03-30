import AT from 'constants/ActionTypes'

const initialState = {
  me: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
  case AT.SIGN_IN_SUCCESS:
    return {
      ...state,
      me: action.user,
    }

  default:
    return state
  }
}

