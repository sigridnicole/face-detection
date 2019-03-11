import React from "react";
import logo from "./Icon/logo.png";

const Logo = ({ onRouteChange, isSignedIn }) => {
  return (
    <img
      onClick={() => {
        if (!isSignedIn) {
          onRouteChange("Start");
        }
      }}
      className="w3 pa3 grow pointer"
      alt="Face Detection Logo"
      src={logo}
    />
  );
};

export default Logo;
