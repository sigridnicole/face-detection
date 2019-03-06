import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {

    if (isSignedIn) {
      return ( 
        <nav className="">
          <div>
          <ul className='bg-black-30 pa0 ma flex justify-end list pl0'>
            <li><Logo /></li>
            <li className='lef'><p onClick = {() => onRouteChange('signout')} className='f3 link dim lightest-blue underline pa3 pointer'>Sign Out</p></li>
          </ul></div>
        </nav>
      )
      
    } else {
      return (
          <nav><div>
            <ul className='bg-black-30 pa0 ma0 flex justify-end list pl0'>
              <li><Logo /></li>
              <li className='lef'><p onClick = {() => onRouteChange('SignIn')} className='f3 link dim lightest-blue underline pa3 pointer'>Sign In</p>
              <p onClick = {() => onRouteChange('register')} className='f3 link dim lightest-blue underline pa3 pr6 pointer'>Register</p></li>
            </ul></div>
          </nav>
      )
    }
}

export default Navigation;