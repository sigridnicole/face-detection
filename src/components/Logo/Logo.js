import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import logo from './super final.png';

const Logo = () => {
  return (
    <div className='ma4'>
        <Tilt options={{ max : 30 }} >
          <div className="Tilt-inner">
             <img  className= 'final' alt ='Brain Logo' src={logo}/>        
          </div>
        </Tilt>
    </div>
  );
}

export default Logo;