import React, { Component } from 'react';
import { StyledForm, SmallerLabel, DropdownLabel, SmallerInput, StyledSubmit, StyledSelect } from '../styled/form'

class ScreeningEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            screenings: props.screenings,
            height: null,
            weight:null,
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.screenings !== this.props.screenings){
            this.setState({
                screenings: this.props.screenings
            })
        }
    }

    handleChanges = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    findScreening = e =>{
        const UpdatedScreening= this.state.screenings.filter(screening => screening.id == this.refs.screeningSelector.value)
        console.log(UpdatedScreening);
        this.setState({
            height: UpdatedScreening[0].height,
            weight: UpdatedScreening[0].weight
        })
    }

    submitForm = e =>{
        e.preventDefault();
        const updatedValues = {
            height: parseInt(this.state.height, 10),
            weight: parseInt(this.state.weight, 10)
        }

        this.props.editScreen(this.refs.screeningSelector.value, updatedValues)


    }



    render(){
        return(
            <StyledForm onSubmit={e => this.submitForm(e)}>
                <DropdownLabel>
                    Screening
                    <StyledSelect ref='screeningSelector' onChange={e => this.findScreening(e)}>
                        <option value="select">Screening Number</option>
                        {this.state.screenings.map(screening =>{
                            return <option key={screening.id} value={screening.id}>{screening.id}</option>
                        })}
                    </StyledSelect>
                </DropdownLabel>
                <SmallerLabel>
                    Height:
                    <SmallerInput 
                        type='text' 
                        value={this.state.height || ''} 
                        name='height' 
                        onChange={e => this.handleChanges(e)} 
                    />
                </SmallerLabel>
                <SmallerLabel>
                    Weight:
                    <SmallerInput 
                        type='text' 
                        value={this.state.weight || ''} 
                        name='weight' 
                        onChange={e => this.handleChanges(e)} 
                    />
                </SmallerLabel>
                <StyledSubmit type='submit' />
            </StyledForm>
        )
    }
}

export default ScreeningEdit;