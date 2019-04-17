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
            height: '',
            wieght: '',
            sex: "M"
        }
    }

    formChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    dropdownChange = e =>{
        this.setState({
            sex: this.refs.sexSelector.value
        })    
    }


    submitForm = e =>{
        e.preventDefault();
        console.log("will add child here");

        const newChild = {
            name: this.state.name,
            guardian: this.state.guardian,
            contact: this.state.contact,
            dob: this.state.dateOfBirth,
            country_id: parseInt(this.state.country, 10),
            community_id: parseInt(this.state.community, 10),
            sex: this.state.sex
        }

        console.log(newChild);
        //Will call axios.post when ready

        axiosWithAuth().post('https://intl-child-backend.herokuapp.com/api/children', newChild)
            .then(res => console.log(res))
            .catch(err => console.log(err));


    }

    render(){
        console.log(this.props.community)
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
                        Date of Birth (MMDDYYYY):
                        <input 
                            type='text'
                            value={this.state.dateOfBirth}
                            name='dateOfBirth' 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Sex:
                        <select ref='sexSelector' onChange={e => this.dropdownChange(e)}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="I">Other</option>
                        </select>
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
                        Phone Number (###-###-####):
                        <input 
                            type='text'
                            name='contact'
                            value={this.state.contact} 
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