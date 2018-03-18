import * as Redux from 'redux'
import { routerReducer } from 'react-router-redux'

import userReducer from 'reducer/userReducer'
export default Redux.combineReducers(
  {
    userReducer,
    router: routerReducer,
  }
)
