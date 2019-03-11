import React from 'react';
import Logo from '../Logo/Logo';
import source from './Icons/source.png';
import logout from './Icons/logout.png';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return (
      <nav className="main-nav pa0 ma0 bg-black-30 flex space-between">
        <div className="ph7-l ph1 ph4-m">
          <Logo onRouteChange = {onRouteChange} isSignedIn={isSignedIn}/>
        </div>
        <div className="ml-auto ph7-l ph4-m">
          <img className= 'w3 pointer pa3' alt ='Log out' src={logout}
          onClick = {() => onRouteChange('signout')} 
          />  
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav pa0 ma0 bg-black-30 flex space-between">
        <div className="ph7-l ph1 ph4-m">
          <Logo onRouteChange = {onRouteChange} isSignedIn={isSignedIn}/>
        </div>
        <div className="ml-auto ph7-l ph1 ph4-m">
          <img className= 'w3 pointer pa3' alt ='Source Code' src={source}
          onClick={()=> window.location.href= "https://github.com/sigridnicole/face-detection"}
          />
        </div>
      </nav>
    );
  }
}

export default Navigation;