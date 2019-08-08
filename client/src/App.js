import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Main from './components/main/Main';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import AuthService from './services/AuthServices';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import AboutUs from './components/about-us/AboutUs';
import Classes from './components/classes/Classes';
import Newsletter from './components/newsletter/Newsletter';
import Gallery from './components/gallery/Gallery';
import Faq from './components/faq/Faq';
import PasswordRecovery from './components/password-recovery/PasswordRecovery';
import Breakpoint, { BreakpointProvider } from 'react-socks';




class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentlyLoggedIn: null,
      ready: false,
      signupShowing: false,
      loginShowing: false,
      forgotPasswordShowing: false,
   };

   this.service = new AuthService();
  }

  getCurrentlyLoggedInUser = () =>{
    this.service.currentUser()
    .then((theUser)=>{
      this.setState({currentlyLoggedIn: theUser})
    })
    .catch(()=>{
      this.setState({currentlyLoggedIn: null})
    })
  }


  toggleForm = (thisForm) =>{
    let theForm;
    let theOther;
    if(thisForm === "signup"){
      theForm = 'signupShowing'
      theOther = 'loginShowing'
    } else {
      theForm = 'loginShowing'
      theOther = 'signupShowing'
    }
    this.setState({[theForm]: !this.state[theForm], [theOther]: false })
    
  }

  hideLoginAndSignupForms = () => {
    this.setState({ 
      signupShowing: false,
      loginShowing: false
    })
  }



  componentDidMount() {
    this.getCurrentlyLoggedInUser();
  }


  render(){

    return (
      <div className="app">
        <BreakpointProvider>
        <Nav
          theUser = {this.state.currentlyLoggedIn} 
          pleaseLogOut = {()=> this.service.logout()}
          toggleForm = {this.toggleForm}
          getUser = {this.getCurrentlyLoggedInUser}
          hideLoginAndSignupForms={this.hideLoginAndSignupForms}
        />
      </BreakpointProvider>

        {this.state.signupShowing && 
          <Signup
            getUser = {this.getCurrentlyLoggedInUser}
            toggleForm = {this.toggleForm}
          />
        }

        {this.state.loginShowing && 
          <Login
            getUser = {this.getCurrentlyLoggedInUser}
            toggleForm = {this.toggleForm}
          />
        }
        <Switch>

          <Route exact path="/profile" render ={(props)=> 
            this.state.currentlyLoggedIn ? 
            <Profile
              {...props} 
              theUser = {this.state.currentlyLoggedIn}
              getCurrentUser = {this.getCurrentlyLoggedInUser}
            /> 
          :
          <Redirect to="/" />}
          />

          <Route exact path="/aboutus" component={AboutUs}/>
          <Route exact path="/" component={Main}/>
          <Route exact path="/classes" render ={(props)=> 
            <Classes
              {...props} 
              theUser = {this.state.currentlyLoggedIn}
              getCurrentUser = {this.getCurrentlyLoggedInUser}/>}/>
              
          <Route exact path="/newsletter" component={Newsletter}/>

          <Route exact path="/gallery" render ={(props)=> 
            <Gallery
              {...props} 
              theUser = {this.state.currentlyLoggedIn}
              getCurrentUser = {this.getCurrentlyLoggedInUser}/>}
              />
              
          <Route exact path="/faq" render ={(props)=> 
            <Faq
              {...props} 
              theUser = {this.state.currentlyLoggedIn}
              getCurrentUser = {this.getCurrentlyLoggedInUser}/>}/>

          <Route exact path="/forgot-password-email" component={PasswordRecovery}/>
              
          <Route exact path="/forgot-password-update/:id" render ={(props)=> 
            <PasswordRecovery {...props} forReset />}/>

        </Switch>
        <BreakpointProvider>      
          <Footer />
        </BreakpointProvider>
      </div>
    );
  }
}
export default App;