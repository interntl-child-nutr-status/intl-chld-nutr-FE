import React, { Component } from 'react';
import Community from './Community';
import { Link } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { StyledDivList, NoDataP } from '../styled/List';
import { StyledHeaderTwo } from '../styled/form';


class CommunityList extends Component {
    constructor(props){
        super(props);
        this.state={
            communities: [],
            country: '',
            countryName: '',
            empty: false,
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
            .catch(err => {
                this.setState({
                    countryName: localStorage.getItem('countryName'),
                    empty: true
                })
            });



    }




    render(){
        return(
            <StyledDivList>
                <StyledHeaderTwo>Communities in {this.state.countryName}</StyledHeaderTwo>
                {this.state.communities.map(comm => {
                    return(<Link key={comm.id} to={`${this.props.history.location.pathname}/${comm.id}`}><Community name={comm.community} city={comm.city} /> </Link>)
                })}
                {this.state.empty && (<NoDataP>This country doesn't have any active communities. Add one from the "View Countries" page to get started!</NoDataP>)}
            </StyledDivList>
        )
    }
}

export default CommunityList;