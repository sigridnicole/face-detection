import React from 'react';

const About = ({onRouteChange}) => {
  return (
    <article className="br3 ba dark-gray b--white-80 mv5 w-75 w-50-m w-25-l mw7 shadow-5 center bg-black-30">
      <main className="pa3 white-80 center">
        <div className="measure">
          <legend className="f2 f1-l fw5 ph0 mh0 center">#FaceCounter</legend>
          <ul className="list pl0">
            <li className="pa3 f3 grow">
              {" "}
              <span role="img" aria-label="paper">
                📝
              </span>{" "}
              Register/Sign In
            </li>
            <li className="pa3 f3 grow">
              <span role="img" aria-label="man technologist">
                👨‍💻
              </span>{" "}
              Detect and count faces
            </li>
            <li className="pa3 f3 grow">
              {" "}
              <span role="img" aria-label="save">
                💾
              </span>{" "}
              Accumulate & save count
            </li>
          </ul>
          <div className="flex center">
            <div className="pa2">
              <input
                onClick={() => onRouteChange("SignIn")}
                className="white-80 b--white-80 input-reset ba b--black bg-transparent grow pointer f5 fw4 dib pa2"
                type="button"
                value="SignIn"
              />
            </div>
            <div className="pa2">
              <input
                onClick={() => onRouteChange("register")}
                className="white-80 b--white-80 input-reset ba b--black bg-transparent grow pointer f5 fw4 dib pa2"
                type="button"
                value="Register"
              />
            </div>
          </div>
        </div>
      </main>
    </article>
  );
};

export default About;