import React, { Component } from 'react';
import './App.css';
import NewUser from './components/NewUser';
import SignIn from './components/SignIn';
import CountryList from './components/CountryList';
import CommunityList from './components/CommunityList';
import { Route, Link } from 'react-router-dom';
import CommunityPage from './components/CommunityPage';
import PrivateRoute from './PrivateRoute';
import Child from './components/Child';
import { StyledNav, StyledDiv, StyledP } from './styled/Nav';

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
        <StyledNav>
          {localStorage.getItem('adminStatus')==='true' && <StyledDiv><Link to='/newUser'><StyledP>Add a User</StyledP></Link></StyledDiv>}
          {localStorage.getItem('token') && <StyledDiv><Link onClick={() => {
              localStorage.removeItem('adminStatus')
              localStorage.removeItem('token')
              this.setState({
                loggedIn: false
              })
            }} to='/'><StyledP>Log Out</StyledP></Link> </StyledDiv>}
          {localStorage.getItem('token') && <StyledDiv><Link to='/countries'><StyledP>View Countries</StyledP></Link></StyledDiv>}
        </StyledNav>

        <PrivateRoute path='/newUser' component = {NewUser} admin={true} />
        <Route exact path='/children/:childID' component={Child} />
        <Route exact path='/' render={(props) => <SignIn {...props} signIn={this.signIn}/>} />
        <Route exact path='/countries' component = {CountryList} />
        <Route exact path='/countries/:countryID' component = {CommunityList} />
        <Route exact path='/countries/:countryID/:communityID' component = {CommunityPage} />
      </div>
    );
  }
}

export default App;
