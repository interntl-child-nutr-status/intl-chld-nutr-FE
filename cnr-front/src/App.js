import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';
import SignIn from './components/SignIn';
import CountryList from './components/CountryList';
import CommunityList from './components/CommunityList';
import { Route, Link } from 'react-router-dom';
import CommunityPage from './components/CommunityPage';
import PrivateRoute from './PrivateRoute';
import NewChildForm from './components/NewChildForm';

class App extends Component {
  constructor(){
    super();
    this.state={
      loggedIn: false
    };
  }

  signIn = () =>{
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          {localStorage.getItem('adminStatus') &&<Link to='/newUser'>Add a User</Link>}
          <Link onClick={() => {
              localStorage.removeItem('adminStatus')
              localStorage.removeItem('token')
              this.setState({
                loggedIn: false
              })
            }} to='/'>Log Out</Link>
          <Link to='/countries'>View Countries</Link>
        </nav>

        <PrivateRoute path='/newUser' component = {NewUser} admin={true} />
        <Route exact path='/' render={(props) => <SignIn {...props} signIn={this.signIn}/>} />
        <Route exact path='/countries' component = {CountryList} />
        <Route exact path='/countries/:countryID' component = {CommunityList} />
        <Route exact path='/countries/:countryID/:communityID' component = {CommunityPage} />
      </div>
    );
  }
}

export default App;
