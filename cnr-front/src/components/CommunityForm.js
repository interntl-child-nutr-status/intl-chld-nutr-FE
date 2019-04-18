import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth'
import { SmallerLabel, SmallerInput, StyledForm, DropdownLabel, StyledSubmit, StyledSelect } from '../styled/form'

class CommunityForm extends Component{
    constructor(props){
        super(props);

        this.state={
            community: '',
            city: '',
            countries: [],
            selected: null
        }
    }

    formChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){

        if(localStorage.getItem('countryName')){
            this.setState({
                countries:[
                    {
                        id: localStorage.getItem('countryId'),
                        country: localStorage.getItem('countryName')
                    }
                ]
            })
        }
        else{
            axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries')
                .then(res => {
                    this.setState({
                        countries: res.data
                    })
                })
                .catch(err => console.log(err))
            }
    }

    dropdownChange = e =>{
        this.setState({
            selected: this.refs.countrySelector.value
        })
    }

    formSubmit = e =>{
        e.preventDefault();
        const newCommunity={
            name: this.state.community,
            city: this.state.city
        }
        axiosWithAuth().post(`https://intl-child-backend.herokuapp.com/api/communities/${this.state.selected}`, newCommunity)
            .then(res => {
                this.props.refresh();
            })
            .catch(err => console.log(err));



    }

    render(){
        return(
            <div>
                <StyledForm onSubmit={e=> this.formSubmit(e)}>
                    <DropdownLabel>
                        Country:
                        <StyledSelect onChange={e => this.dropdownChange(e)} ref="countrySelector">
                            <option value='select'>Please Select a Country</option>
                            {this.state.countries.map(country =>{
                                return(<option key={country.id} value={country.id}>{country.country}</option>)
                            })}
                        </StyledSelect>
                    </DropdownLabel>
                    <SmallerLabel>
                        City:
                        <SmallerInput
                            type='text'
                            name='city'
                            value={this.props.city}
                            onChange={e => this.formChange(e)} 
                        />
                    </SmallerLabel>
                    <SmallerLabel>
                        Community:
                        <SmallerInput 
                            type='text'
                            name='community'
                            value={this.props.community}
                            onChange={e => this.formChange(e)}/>
                    </SmallerLabel>
                    <StyledSubmit type='submit' />
                </StyledForm>
            </div>
        )
    }
}

export default CommunityForm;