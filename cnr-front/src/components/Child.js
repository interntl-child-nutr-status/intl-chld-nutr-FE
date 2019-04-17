import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth';
import { Redirect } from 'react-router-dom';

class Child extends Component{
    constructor(props){
        super(props);
        this.state = {
            screenings: [],
            childName: '',
            childId: parseInt(this.props.location.pathname.split('/')[2], 10),
            attemptDelete: false,
            deleteSuccess: false,
            communityId: null,
            countryId: null
        }
    }

    componentDidMount(){
        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
            .then(res => {
                console.log(res);
                this.setState({
                    communityId: res.data.community_id,
                    countryId: res.data.country_id
                })
            })
            .catch(err => console.log(err));
    }

    attemptDelete = e =>{
        if (this.state.attemptDelete){
            this.setState({
                attemptDelete: false
            })
        }
        else{
            this.setState({
                attemptDelete: true
            })
        }
    }

    deleteChild = () =>{
        console.log("get rid of the kid here")
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
            .then(res => this.setState({deleteSuccess: true}))
            .catch(err => console.log(err));
    }




    render(){
        return (
            <div>
                I'm a child!

                <button onClick={e => this.attemptDelete(e)}>Delete Child Record</button>
                {this.state.attemptDelete && (
                    <div>
                        <p>Are you sure you wish to delete this Child's Records? It can not be undone</p>
                        <button onClick={e => this.deleteChild(e)}>Yes</button>
                        <button onClick={e => this.attemptDelete(e)} >No</button>
                    </div>
                )}
                {this.state.deleteSuccess && <Redirect to={`/countries/${this.state.countryId}/${this.state.communityId}`} />}
            </div>
        )
    }
}

export default Child;