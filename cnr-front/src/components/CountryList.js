import React, { Component } from 'react';
import Country from './Country';
import { Link } from 'react-router-dom';

class CountryList extends Component{
    constructor(props){
        super(props);

        this.state={
            countries: []
        };
    }

    componentDidMount(){
        console.log("will do axios call to grab countries");
        const countryList = [
            {
                name: 'USA',
                communities: 4,
                id: 0
            },
            {
                name: 'Canada',
                communities: 2,
                id: 1
            },
            {
                name: 'Mexico',
                communities: 5,
                id: 2
            }
        ];

        this.setState({
            countries: countryList
        })
    }


    render(){
        return(
            <div>
                {this.state.countries.map(country =>{
                    return <Link key={country.id} to={`/countries/${country.id}`}><Country name={country.name} communities={country.communities} /></Link>
                })}
            </div>
        )
    }
}

export default CountryList;