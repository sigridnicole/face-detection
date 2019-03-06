import React from 'react';
import './FaceDetection.css';

const BoundingBoxes = ({boxPosition}) => {
  return (
    boxPosition.map((box, i) => {
      return (
        <div key={i} className='bounding-box'
            style={{
                top: box.top,
                right: box.right,
                left: box.left,
                bottom: box.bottom
            }} >
        </div>
      )
    })
  )
}

const FaceDetection = ({ box, imageURL }) => { 
  return (
    <div className = 'center ma'>
      <div className = 'absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' width='550px' height='auto'/>
        <BoundingBoxes boxPosition={box}/>
        </div>
    </div>
  );
}

export default FaceDetection;