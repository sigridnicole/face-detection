import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className = 'f4 f3-l'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center form'>
        <div className='pa4 br3 shadow-5 bg-black-80 center'>
          <input type='text' className='f4 pa2 w-70 center dib' onChange = {onInputChange}/>
          <button 
            className = 'w-30 grow f5 f4-l link ph3 pv2 dib white bg-transparent button ba'
            onClick = {onButtonSubmit}>
              Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;