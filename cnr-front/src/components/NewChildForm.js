import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth';

class NewChildForm extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            guardian: '',
            contact: '',
            dateOfBirth: '',
            country: null,
            community: null,
            countries: [],
            communities: [{Community: 'test', id: 1}]
        }
    }

    formChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    dropdownChange = e =>{
        console.log("use get to pull communities for selected country");
        this.setState({
            country: this.refs.countrySelect.value
        })
    }

    communityChange = e =>{
        this.setState({
            community: this.refs.communitySelect.value
        })
    }


    componentDidMount(){
        //getting list of countries for dropdown menu
        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries/active/')
            .then(res => this.setState({countries: res.data}))
            .catch(err => console.log(err))
    }

    submitForm = e =>{
        e.preventDefault();
        console.log("will add child here");

        const newChild = {
            name: this.state.name,
            guardian: this.state.guardian,
            contact: this.state.contact,
            dateOfBirth: this.state.dateOfBirth,
            country: this.state.country,
            community: this.state.community
        }

        console.log(newChild);
    }

    render(){
        console.log(this.state);
        return(
            <div>
                <form onSubmit = {e => this.submitForm(e)}>
                    <label>
                        Name:
                        <input 
                            type='text'
                            name='name'
                            value={this.state.name} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Primary Guardian:
                        <input 
                            type='text'
                            name="guardian"
                            value={this.state.guardian} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input 
                            type='text'
                            name='contact'
                            value={this.state.contact} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Date of Birth (MMDDYYYY):
                        <input 
                            type='text'
                            value={this.state.dateOfBirth}
                            name='dateOfBirth' 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Country:
                        <select ref="countrySelect" onChange={e => this.dropdownChange(e)}>
                            <option value='placeholder'>Please Select a Country</option>
                            {this.state.countries.map(country => {
                                return(<option key={country.id} value={country.id}>{country.Country}</option>)
                            })}
                        </select>
                    </label>

                    {(this.state.communities.length > 0) && (
                        <label>
                        Community:
                        <select ref="communitySelect" onChange={e => this.communityChange(e)}>
                            <option value='placeholder'>Please Select a Community</option>
                            {this.state.communities.map(community => {
                                return(<option key={community.id} value={community.id}>{community.Community}</option>)
                            })}
                        </select>
                        <input type='submit' />
                    </label>
                    )}
                </form>
            </div>
        )
    }

}

export default NewChildForm;