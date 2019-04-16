import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth';

class NewUser extends Component{
    constructor(props){
        super(props);
        this.state={
            countries: [],
            username: '',
            password: '',
            selectedValue: null
        }
    }

    componentDidMount(){

        console.log("calling /api/countries for full country list");

        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries')
            .then(res => this.setState({countries: res.data}))
            .catch(err => console.log(err));

    }


    dropdownChange = e =>{
        this.setState({
            selectedValue: this.refs.countrySelector.value
        })
    }

    formChanges = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmit = e =>{
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        if (this.state.selectedValue === 'admin'){
            newUser.role_id= 1
        }
        else{
            newUser.role_id=2;
            newUser.country_id=parseInt(this.state.selectedValue, 10)
        }

        console.log(newUser);

        axiosWithAuth().post('https://intl-child-backend.herokuapp.com/api/auth/register', newUser)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        this.setState({
            username: '',
            password: '',
            selectedValue: null
        })

        //will need to send to server to add user
    }


    render(){
        //console.log(this.state)
        return(
            <div className="signUp">
                <h2>Add A New User</h2>
                <form onSubmit={e => this.formSubmit(e)}>
                    <label>
                        Username:
                        <input 
                        name="username"
                        onChange={e => this.formChanges(e)}
                        value={this.state.username}
                        type='text' />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={e => this.formChanges(e)}
                        name='password'
                        value={this.state.password}
                        type='password' />
                    </label>
                    <label>
                        Country:
                        <select onChange={e => this.dropdownChange(e)} ref="countrySelector">
                            <option value="admin">N/A: Admin</option>
                            {this.state.countries.map(country =>{
                                return(<option key={country.id} value={country.id}>{country.Country}</option>)
                            })}
                        </select>
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default NewUser;