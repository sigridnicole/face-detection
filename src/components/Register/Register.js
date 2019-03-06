import React from 'react';

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      errorReason: ''
    }
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    const emailValid = this.validateEmail(event.target.value)
    if (!emailValid) {
      this.setState({
        invalidEmail: true,
        errorReason:'Please enter a valid email.'
      })
    } else {
      this.setState({
        invalidEmail: false,
        errorReason:''
      })
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
    this.validatePassword(event.target.value)
  }

  validatePassword = (password) => {
    if (password.length < 6) {
      this.setState({
        invalidPassword: true,
        errorReason: 'Atleast 6 characters password.'
      })
    } else {
      this.setState({
        invalidPassword: false,
        errorReason: ''
      }) 
    }
  }
  
  onSubmitRegister = () => {

    const {email, name, password, errorReason, invalidEmail, invalidPassword} = this.state;
    
    if (!email || !name || !password) {
      this.setState({errorReason: 'Incomplete form.'})
    } else {
      this.setState({errorReason: ''})
    }

    if (!errorReason && !invalidEmail && !invalidPassword) {
      fetch('https://facecounter.herokuapp.com/register',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
    } 
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.onSubmitRegister();
    }
  }
    
  render () { 
    
    const { errorReason, invalidEmail, invalidPassword } = this.state;
    const { onPasswordChange, onSubmitRegister, onNameChange, onEmailChange } = this;

    let errorClass = 'no-error';
    let emailClass = 'b--white-80'
    let nameClass = 'b--white-80'
    let passwordClass = 'b--white-80'

    if (invalidPassword) {
      passwordClass = 'b--red'
    }
    if (invalidEmail) {
      emailClass = 'b--red'
    }
    if (errorReason) {
      errorClass='show-error-message-yes';
    }

    return (
      <article className="br3 ba white b--white-80 mv5 w-75 w-50-m w-25-l mw7 shadow-5 center bg-black-30">
        <main className="pa4 white-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent pa0 mh0">
              <legend className="f1 fw5 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  onKeyPress =  {this.handleKeyPress}
                  className={`pa2 white input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 outline-0 ${nameClass}`}
                  type="text" 
                  name="name"  
                  id="name"
                  title="What's your name?"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="mt3 db fw4 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onKeyPress =  {this.handleKeyPress}
                  className={`pa2 white input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 outline-0 ${emailClass}`}
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  title="Enter a valid email address."
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onKeyPress =  {this.handleKeyPress}
                  className={`pa2 white input-reset ba bg-transparent hover-bg-white-30 hover-white w-100 outline-0 ${passwordClass}`} 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className={`f7 fw1 red ${errorClass}`}>
              {`${errorReason}`}
            </div>
            <div className='pt3'>
              <input 
                onClick = {onSubmitRegister}
                className="white-80 b--white-80 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 fw4 dib" 
                type="submit" 
                value="Register" 
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;