import React, { Component } from 'react';
import { StyledForm, SmallerLabel, DropdownLabel, StyledSubmit, SmallerInput, StyledSelect } from '../styled/form';

class ChildEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            ...props
        }
    }

    formChange = e => {
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

        const updatedChild = {
            ...this.state
        }

        console.log(updatedChild);
        delete updatedChild.submitUpdate;
        this.props.submitUpdate(updatedChild);
    }



    render(){
        return(
            <div>
                <StyledForm onSubmit = {e => this.submitForm(e)}>
                    <SmallerLabel>
                        Name:
                        <SmallerInput 
                            type='text'
                            name='name'
                            value={this.state.name} 
                            onChange={e => this.formChange(e)} 
                        />
                    </SmallerLabel>
                    <SmallerLabel>
                        Date of Birth (MMDDYYYY):
                        <SmallerInput 
                            type='text'
                            value={this.state.dob}
                            name='dob' 
                            onChange={e => this.formChange(e)} 
                        />
                    </SmallerLabel>
                    <DropdownLabel>
                        Sex:
                        <StyledSelect defaultValue={this.state.sex} ref='sexSelector' onChange={e => this.dropdownChange(e)}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="I">Other</option>
                        </StyledSelect>
                    </DropdownLabel>
                    <SmallerLabel>
                        Primary Guardian:
                        <SmallerInput 
                            type='text'
                            name="guardian"
                            value={this.state.guardian} 
                            onChange={e => this.formChange(e)} 
                        />
                    </SmallerLabel>
                    <SmallerLabel>
                        Phone Number (###-###-####):
                        <SmallerInput 
                            type='text'
                            name='contact'
                            value={this.state.contact} 
                            onChange={e => this.formChange(e)} 
                        />
                    </SmallerLabel>
                    <label>
                        <StyledSubmit type='submit' />
                    </label>
                </StyledForm>
            </div>
        )
    }
}

export default ChildEdit;