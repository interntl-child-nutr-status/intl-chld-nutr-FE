import React, { Component } from 'react';

class NewUser extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            selectedValue: null
        }
    }

    componentDidMount(){
        console.log(this.refs)
        this.setState({
            selectedValue: this.refs.countrySelector.value
        });
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
            newUser.userType='admin'
        }
        else{
            newUser.usertype='user';
            newUser.country=this.state.selectedValue
        }

        console.log(newUser);
    }


    render(){
        console.log(this.state)
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
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                        </select>
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default NewUser;