import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';
import SignIn from './components/SignIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <NewUser /> */}
        <SignIn />
      </div>
    );
  }
}

export default App;
