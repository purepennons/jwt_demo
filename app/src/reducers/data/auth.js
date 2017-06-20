import { handleActions } from 'redux-actions'

import {AuthState} from '../../constants/models'

export default handleActions({
    LOGIN: (prev_state, { payload }) => ({...prev_state, ...payload}),
}, AuthState)
