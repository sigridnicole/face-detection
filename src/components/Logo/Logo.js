import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
    <div className='ma4'>
    <ul className='flex justify-end list pl0'>
    <li><Tilt options={{ max : 30 }} ><img  className= 'w3 pl6' alt ='Brain Logo' src={logo}/></Tilt></li>
        {/* <li><p className="ma0 f2 f3-m pa2">FaceCounter</p></li> */}
    </ul>
    </div>
  );
}

export default Logo;