import AT from 'constants/ActionTypes'

const initialState = {
  me: null,
  isLoading: false,
  errorMessages: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AT.SIGN_IN_SUCCESS:
      return {
        ...state,
        me: action.user,
      }

    case AT.SIGN_IN_FAILURE:
      return {
        ...state,
        errorMessages: action.messages,
      }

    case AT.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }

    default:
      return state
  }
}

