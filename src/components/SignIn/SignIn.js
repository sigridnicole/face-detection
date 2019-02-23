import React from 'react';

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

  render () {
    // const { validCredentials } = this.state;
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--white-80 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center bg-black-30">
        {/* <main className="pa4 black-80"> */}
        <main className="pa4 white-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 b--white-80" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 b--white-80" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitSignIn}
                className="white-80  b--white-80 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
            <p onClick = {() => onRouteChange('Register')} className="white-80 f6 link dim db pointer">No account yet? Register.</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;