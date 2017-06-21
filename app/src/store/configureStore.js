import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import reduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import rootReducer from '../reducers/'
import history from './history'

const initialState = {}

export default createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(
            createLogger(),
            reduxThunk,
            promiseMiddleware(),
            routerMiddleware(history),
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)