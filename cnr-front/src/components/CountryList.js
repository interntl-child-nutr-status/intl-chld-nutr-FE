import React, { Component } from 'react';
import Country from './Country';
import axiosWithAuth from "./axiosWithAuth.js";
import CommunityForm from './CommunityForm';
import { StyledDivList, StyledButton } from '../styled/List'

class CountryList extends Component{
    constructor(props){
        super(props);

        this.state={
            countries: [],
            addingCommunity: false
        };
    }

    componentDidMount(){
        console.log("grabbing country list");

        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries/active/')
            .then(res => this.setState({countries: res.data}))
            .catch(err => console.log(err));

    }

    communityToggle = e =>{
        if (this.state.addingCommunity){
            this.setState({
                addingCommunity: false
            })
        }
        else{
            this.setState({
                addingCommunity: true
            })
        }
    }

    refreshCountries = () =>{
        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries/active/')
        .then(res => this.setState({countries: res.data}))
        .catch(err => console.log(err));
    }


    render(){
        console.log(this.state.countries);
        return(
            <StyledDivList>
                {this.state.countries.map(country =>{
                    return <Country key={country.id} id={country.id} name={country.country} communities={country.communities} />
                })}

                <StyledButton onClick={e => this.communityToggle(e)}>Add a Community</StyledButton>
                {this.state.addingCommunity && <CommunityForm refresh={this.refreshCountries} />}
            </StyledDivList>
        )
    }
}

export default CountryList;