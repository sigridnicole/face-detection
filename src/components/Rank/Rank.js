import React from "react";

const Rank = ({ name, entries, faceCount }) => {
  return (
    <div className="white">
      <p className="f1">
        <span className="count">Hi {name}!</span>
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
      </p>
      <p className="f4">
        We'll detect{" "}
        <span role="img" aria-label="magnifying glass">
          🔍
        </span>{" "}
        and count{" "}
        <span role="img" aria-label="numbers">
          🔢
        </span>{" "}
        faces for you. Give it a try!{" "}
        <span role="img" aria-label="face with monocle">
          🧐
        </span>
      </p>
      <div className="display flex center pa4">
        <span className="pa2">
          <div className="pa2 ph4 ba br3 b--white-80 w-100 shadow-5 bg-black-80">
            <p className="f4">Total faces detected:</p>
            <p className="f2 fw2 count">{entries}</p>
          </div>
        </span>
        <span className="pa2">
          <div className="pa2 ph4 ba br3 b--white-80 w-100 shadow-5 bg-black-80">
            <p className="f4">In current picture: </p>
            <p className="f2 fw2 count">{faceCount}</p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Rank;
