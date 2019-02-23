import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ box, imageURL }) => {
  return (
    <div className = 'center ma'>
      <div className = 'absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' width='550px' height='auto'/>
        <div className='bounding-box' style = {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceDetection;