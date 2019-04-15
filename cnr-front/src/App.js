import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';
import SignIn from './components/SignIn';
import CountryList from './components/CountryList';
import CommunityList from './components/CommunityList';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <NewUser /> */}
        {/* <SignIn /> */}
        {/* <CountryList /> */}
        <CommunityList />
      </div>
    );
  }
}

export default App;
