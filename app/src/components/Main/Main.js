import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HeaderContainer from '../../containers/HeaderContainer'
import FooterContainer from '../../containers/FooterContainer'
import HomeContainer from '../../containers/HomeContainer'
import LoginContainer from '../../containers/LoginContainer'
import UserInfoContainer from '../../containers/UserInfoContainer'

const Main = (props) => { 
  return (
    <Router>
      <div>
        <HeaderContainer />

        <Route exact path="/" component={HomeContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/profile" component={UserInfoContainer}/>

        <FooterContainer />
      </div>
    </Router>
  )  

}

export default Main;
