import * as Redux from 'redux'
import { routerReducer as router } from 'react-router-redux'

import auth from 'reducer/authReducer'
export default Redux.combineReducers(
  {
    auth,
    router,
  }
)
