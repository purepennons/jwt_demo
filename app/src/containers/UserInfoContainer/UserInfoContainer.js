import { connect } from 'react-redux'

import ReactComponent from '../../components/UserInfo/'
import {} from '../../actions/'

export default connect(
    state => ({ auth: state.auth}),
    dispatch => ({})
)(ReactComponent)