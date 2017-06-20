import { connect } from 'react-redux'

import ReactComponent from '../../components/UserInfo/'
import {} from '../../actions/'

export default connect(
    state => { 
        console.log(Object.keys(state))
        return {
            userInfo: {
                id: '',
                username: ''
            }
        }
    },
    dispatch => ({})
)(ReactComponent)