import * as Redux from 'redux'
import { routerReducer as router } from 'react-router-redux'

import user from 'reducer/userReducer'
export default Redux.combineReducers(
  {
    user,
    router,
  }
)
