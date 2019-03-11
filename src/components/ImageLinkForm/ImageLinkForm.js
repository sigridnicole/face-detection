import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <div className="center pa1">
        <div className="pa4 br3 shadow-5 bg-black-80 center f5">
          <input
            type="text"
            placeholder="Image address/URL"
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
    </div>
  );
};

export default ImageLinkForm;
