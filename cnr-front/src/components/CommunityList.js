import React, { Component } from 'react';
import Community from './Community';
import { Link } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';


class CommunityList extends Component {
    constructor(props){
        super(props);
        this.state={
            communities: [],
            country: '',
            countryName: ''
        }

    }

    componentDidMount(){  

        const countryId = this.props.history.location.pathname.substring(this.props.history.location.pathname.lastIndexOf('/') + 1, this.props.history.location.pathname.length)

        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/communities/${countryId}`)
            .then(res => {
                console.log(res);
                this.setState({ 
                    communities: res.data,
                    country: countryId,
                    countryName: res.data[0].country
                 })
            })
            .catch(err => console.log(err));



    }




    render(){
        return(
            <div>
                <h1>Communities in {this.state.countryName}</h1>
                {this.state.communities.map(comm => {
                    return(<Link key={comm.id} to={`${this.props.history.location.pathname}/${comm.id}`}><Community name={comm.community} city={comm.city} /> </Link>)
                })}
            </div>
        )
    }
}

export default CommunityList;