import React, { Component } from 'react';
import { StyledForm, SmallerLabel, SmallerInput, StyledSubmit } from '../styled/form';

class CommunityEditForm extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            cityName: this.props.city,
            communityName: this.props.community
        }
    }

    handleChange = e =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    formSubmit = e =>{
        e.preventDefault();
        //console.log("submitting form")
        this.props.submitUpdate({
            name: this.state.communityName,
            city: this.state.cityName
        })
    }

    render(){
        return(
            <div>
                <StyledForm onSubmit={e => this.formSubmit(e)}>
                    <SmallerLabel>
                        City:
                        <SmallerInput 
                            type='text'
                            value={this.state.cityName}
                            onChange={e => this.handleChange(e)}
                            name='cityName'
                        />
                    </SmallerLabel>
                    <SmallerLabel>
                        Community:
                        <SmallerInput 
                            type='text'
                            value={this.state.communityName}
                            onChange={e => this.handleChange(e)}
                            name='communityName'
                        />
                    </SmallerLabel>
                    <StyledSubmit type='submit'/>
                </StyledForm>
            </div>
        )
    }
}

export default CommunityEditForm;