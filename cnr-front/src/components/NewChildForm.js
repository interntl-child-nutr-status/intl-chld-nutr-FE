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
            country: this.props.countryId,
            community: this.props.communityId,
        }
    }

    formChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
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
            community: this.state.communityId
        }

        console.log(newChild);
        //Will call axios.post when ready


    }

    render(){
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
                        <input type='submit' />
                    </label>
                </form>
            </div>
        )
    }

}

export default NewChildForm;