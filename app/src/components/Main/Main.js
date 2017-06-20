import React from 'react';
import {
  Router,
  Route,
} from 'react-router'

import HeaderContainer from '../../containers/HeaderContainer'
import FooterContainer from '../../containers/FooterContainer'
import HomeContainer from '../../containers/HomeContainer'
import LoginContainer from '../../containers/LoginContainer'
import UserInfoContainer from '../../containers/UserInfoContainer'

const Main = (props) => { 
  return (
    <div>
      <HeaderContainer />

      <Route exact path="/" component={HomeContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/profile" component={UserInfoContainer}/>

      <FooterContainer />
    </div>
  )  

}

export default Main;
