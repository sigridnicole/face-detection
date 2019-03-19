import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
       <div className="center pa1">
        <div className="pa4 br3 shadow-5 bg-black-80 center f5">
          <input
            type="text"
            placeholder="Image address"
            className="f4 pa2 w-70 center dib"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f5 f4-l link ph3 pv2 dib white bg-transparent button ba"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
      <p className="white-50 f7">Test image: https://images.says.com/uploads/story_source/source_image/521350/94e6.jpg </p>
    </div>    
  );
};

export default ImageLinkForm;
