import React, { Component } from 'react';
import Country from './Country';
import axiosWithAuth from "./axiosWithAuth.js";

class CountryList extends Component{
    constructor(props){
        super(props);

        this.state={
            countries: []
        };
    }

    componentDidMount(){
        console.log("grabbing country list");

        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries/active/')
            .then(res => this.setState({countries: res.data}))
            .catch(err => console.log(err));

    }


    render(){
        console.log(this.state.countries);
        return(
            <div>
                {this.state.countries.map(country =>{
                    return <Country key={country.id} id={country.id} name={country.country} communities={country.communities} />
                })}
            </div>
        )
    }
}

export default CountryList;