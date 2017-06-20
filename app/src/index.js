// global import
import 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Main from './components/Main/'
import store from './store/'
import history from './store/history'

import registerServiceWorker from './registerServiceWorker'

localStorage.debug = 'container:*'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>    
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
