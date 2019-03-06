import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

 const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 1000
      } 
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#27682C",
        blur: 7
      }
    }
  }
} 

const initialState = {
  input: '',
      imageURL: '',
      box: [],
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '' 
      }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''   
      }
    }
  }

  loadUser = (data) => {
    this.setState( {user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined  
    }})
  }

  calcFaceLocation = (data) => {
    const faceBoxes = []
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;
    clarifaiFace.forEach(eachRegion => {
      const { top_row, left_col, bottom_row, right_col } = eachRegion.region_info.bounding_box
      const boxCoordinates = {
        top: height * top_row,
        right: width - width * right_col,
        bottom: height - height * bottom_row,
        left: width * left_col
      }
      faceBoxes.push(boxCoordinates)
    })
    this.setState({box: faceBoxes})
    return faceBoxes 
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log("input image",this.state.input);
    
    this.setState({imageURL: this.state.input});
    fetch('https://facecounter.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://facecounter.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log())
      }
      this.calcFaceLocation(response)      
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params = {particlesOptions} />
        <Navigation 
            isSignedIn = {isSignedIn}
            onRouteChange = {this.onRouteChange}
        />
          { route === 'home' 
            ? <div> 
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange = {this.onInputChange} 
                  onButtonSubmit = {this.onButtonSubmit}
                />        
                <FaceDetection box={box} imageURL={imageURL} />
              </div>
            : (
              route === 'SignIn'
              ? 
                <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>              
              )            
        }
      </div>
    );
  }
}

export default App;
