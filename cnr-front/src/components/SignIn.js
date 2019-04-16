import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChanges = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = e =>{
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        

        axios.post('https://intl-child-backend.herokuapp.com/api/auth/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('adminStatus', res.data.is_admin);
                this.props.signIn()
            })
            .catch(err => console.log(err));

    }

    render(){
        return(
            <div className='signIn'>
                <h1>Welcome to Child Nutrition Tracking</h1>
                <h2>Please sign in to continue</h2>
                <form onSubmit={e => this.submitForm(e)}>
                    <label>
                        Username:
                        <input 
                            type='text' 
                            onChange={e => this.handleChanges(e)}
                            name='username'
                            value={this.state.username}
                            />
                    </label>
                    <label>
                        Password:
                        <input 
                            type='password' 
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChanges(e)}
                        />
                    </label>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }    
}

export default SignIn;