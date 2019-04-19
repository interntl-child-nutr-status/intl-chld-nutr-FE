import React, { Component } from 'react';
import { StyledForm, SmallerLabel, SmallerInput, StyledSubmit } from '../styled/form';

class ScreeningForm extends Component {
    constructor(props){
        super(props);
        this.state={
            height: '',
            weight: ''
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = e =>{
        console.log(new Date());
        e.preventDefault();
        const newScreening = {
            screen_date: new Date(),
            // height: parseInt(this.state.height, 10),
            // weight: parseInt(this.state.weight, 10)
            height: this.state.height,
            weight: this.state.weight
        }

        this.props.submitScreen(newScreening);
    }

    render(){
        return(
            <StyledForm onSubmit={e => this.submitForm(e)}>
                <SmallerLabel>
                    Height (cm):
                    <SmallerInput
                        type='text'
                        value={this.state.height}
                        name='height'
                        onChange={e => this.handleChange(e)} />
                </SmallerLabel>
                <SmallerLabel>
                    Weight (kg):
                    <SmallerInput
                        type='text'
                        value={this.state.weight}
                        name='weight'
                        onChange={e => this.handleChange(e)} />
                </SmallerLabel>
                <StyledSubmit type='submit' />
            </StyledForm>
        )
    }
}

export default ScreeningForm;