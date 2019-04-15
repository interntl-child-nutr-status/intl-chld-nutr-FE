import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewUser />
      </div>
    );
  }
}

export default App;
