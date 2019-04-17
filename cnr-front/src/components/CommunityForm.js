import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth'

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
        axiosWithAuth().get('https://intl-child-backend.herokuapp.com/api/countries')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <h1>New Community</h1>
                <form>
                    <label>
                        Country:
                        <select onChange={e => this.dropdownChange(e)} ref="countrySelector">
                            {this.state.countries.map(country =>{
                                return(<option key={country.id} value={country.id}>{country.country}</option>)
                            })}
                        </select>
                    </label>
                    <label>
                        City:
                        <input
                            type='text'
                            name='city'
                            value={this.props.city}
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Community:
                        <input 
                            type='text'
                            name='community'
                            value={this.props.community}
                            onChange={e => this.formChange(e)}/>
                    </label>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default CommunityForm;