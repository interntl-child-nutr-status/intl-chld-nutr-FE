import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';
import SignIn from './components/SignIn';
import CountryList from './components/CountryList';
import CommunityList from './components/CommunityList';
import { Route, Link } from 'react-router-dom';
import CommunityPage from './components/CommunityPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/newUser'>Add a User</Link>
          <Link onClick={() => localStorage.removeItem('token')} to='/'>Log Out</Link>
          <Link to='/countries'>View Countries</Link>
        </nav>

        <Route path='/newUser' component = {NewUser} />
        <Route exact path='/' component = {SignIn} />
        <Route exact path='/countries' component = {CountryList} />
        <Route exact path='/countries/:countryID' component = {CommunityList} />
        <Route exact path='/countries/:countryID/:communityID' component = {CommunityPage} />
      </div>
    );
  }
}

export default App;
