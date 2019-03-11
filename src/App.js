import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import About from "./components/About/About";
import Register from "./components/Register/Register";

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#149df2",
        blur: 0
      }
    }
  }
};

const initialState = {
  input: "",
  imageURL: "",
  box: [],
  route: "Start",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    faceCount: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: [],
      route: "Start",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        faceCount: 0,
        joined: ""
      }
    };
  }

  loadUser = data => {
    console.log("user facecount", this.state.user.faceCount);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        faceCount: this.state.user.faceCount
      }
    });
  };

  calcFaceLocation = data => {
    const faceBoxes = [];
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;
    clarifaiFace.forEach(eachRegion => {
      const {
        top_row,
        left_col,
        bottom_row,
        right_col
      } = eachRegion.region_info.bounding_box;
      const boxCoordinates = {
        top: height * top_row,
        right: width - width * right_col,
        bottom: height - height * bottom_row,
        left: width * left_col
      };
      faceBoxes.push(boxCoordinates);
    });
    this.setState({ box: faceBoxes });
    return faceBoxes;
  };

  countFaces = response => {
    const count = response.outputs[0].data.regions.length;
    this.setState(Object.assign(this.state.user, { faceCount: count }));
    console.log("faceCount in count faces", this.state.user.faceCount);
    return count;
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    console.log("input image", this.state.input);
    this.setState({ imageURL: this.state.input });
    fetch("https://facecounterapp.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          this.countFaces(response);
          fetch("https://facecounterapp.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              entries: this.state.user.faceCount
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log());
        }
        this.calcFaceLocation(response);
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    console.log("route", route);
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
              faceCount={this.state.user.faceCount}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection box={box} imageURL={imageURL} />
          </div>
        ) : route === "Start" ? (
          <About onRouteChange={this.onRouteChange} />
        ) : route === "SignIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
