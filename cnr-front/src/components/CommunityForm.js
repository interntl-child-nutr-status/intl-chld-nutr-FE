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
            .then(res => {
                this.setState({
                    countries: res.data
                })
            })
            .catch(err => console.log(err))
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
            .then(res => console.log('here\'s the result', res))
            .catch(err => console.log(err));

    }

    render(){
        return(
            <div>
                <h1>New Community</h1>
                <form onSubmit={e=> this.formSubmit(e)}>
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