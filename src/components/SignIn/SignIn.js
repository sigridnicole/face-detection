import React from 'react';
import About from '../About/About';

class SignIn extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      validCredentials: true
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onWrongCredentials = () => {
    this.setState({validCredentials: false})    
  }

  onSubmitSignIn = () => {
    fetch('https://facecounter.herokuapp.com/signin',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.onWrongCredentials();
          console.log(this.state.validCredentials);
        }
      })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.onSubmitSignIn();
    }
  }

  render () {
    const { validCredentials } = this.state;
    const { onRouteChange } = this.props;
    let errorClass = "no-error";

    if (!validCredentials) {
      errorClass = "show-error"
    }

    return (
      <div>
        <About /> 
        <article className="br3 br--right ba dark-gray b--white-80 mv5 w-75 w-50-m w-25-l mw7 shadow-5 center bg-black-30">
          <main className="pa4 white-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent pa0 mh0">
                <legend className="f1 fw5 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    onKeyPress =  {this.handleKeyPress}  
                    className="pa2 white input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 b--white-80" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    onKeyPress =  {this.handleKeyPress} 
                    className="pa2 white input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 b--white-80" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className={`f7 fw1 red ${errorClass}`}>
                Invalid credentials.
              </div>
              <div className="pt3">
                <input
                  onKeyPress =  {this.handleKeyPress} 
                  onClick={this.onSubmitSignIn}
                  className="white-80 b--white-80 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 fw4 dib" 
                  type="submit" 
                  value="Sign in" 
                />
              </div>
              <div className="lh-copy mt3">
              <p
                onClick = {() => onRouteChange('Register')} 
                className="white-80 f6 link dim db pointer ma0">No account yet? Register.</p>
              </div>
            </div>
          </main>
        </article>
      </div>
      
    );
  }
}

export default SignIn;