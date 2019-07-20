import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { StyledForm, StyledLabel, StyledInput, StyledSubmit, StyledHeader, StyledHeaderTwo } from '../styled/form';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
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
                console.log(res);
                localStorage.setItem('token', res.data.token);
                if(res.data.country){
                localStorage.setItem('countryId', res.data.country.id);
                localStorage.setItem('countryName', res.data.country.name);
                }
                //localStorage.setItem('countryId', res.data.country.id);
                //localStorage.setItem('countryName', res.data.country.name);
                localStorage.setItem('adminStatus', res.data.is_admin);
                this.props.signIn()
                this.setState({loggedIn: true})
            })
            .catch(err => console.log(err));

    }

    render(){
        return(
            <div className='signIn'>
                <StyledHeader>Welcome to Child Nutrition Tracking</StyledHeader>
                <StyledHeaderTwo>Please sign in to continue</StyledHeaderTwo>
                <StyledForm onSubmit={e => this.submitForm(e)}>
                    <StyledLabel>
                        Username
                        <StyledInput 
                            type='text' 
                            onChange={e => this.handleChanges(e)}
                            name='username'
                            value={this.state.username}
                            />
                    </StyledLabel>
                    <StyledLabel>
                        Password
                        <StyledInput 
                            type='password' 
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChanges(e)}
                        />
                    </StyledLabel>
                    <StyledSubmit type='submit'></StyledSubmit>
                </StyledForm>
                {localStorage.getItem('token') && <Redirect to='/countries' />}
            </div>
        )
    }    
}

export default SignIn;