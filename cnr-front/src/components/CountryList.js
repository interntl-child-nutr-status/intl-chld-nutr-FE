import React, { Component } from 'react';

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
                    return <div key={country.id}>This will be the country component</div>
                })}
            </div>
        )
    }
}

export default CountryList;