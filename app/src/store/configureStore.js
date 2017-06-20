import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import Immutable from 'immutable'

import rootReducer from '../reducers/'
import history from './history'

const initialState = Immutable.Map()

export default createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(
            createLogger({ stateTransformer: state => state.toJS() }),
            routerMiddleware(history)
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)