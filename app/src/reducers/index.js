import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './data/auth'

export default combineReducers({
    auth,
    router: routerReducer,
})