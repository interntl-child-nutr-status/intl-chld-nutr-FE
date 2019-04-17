import React, { Component } from 'react';
import NewChildForm from './NewChildForm';
import axiosWithAuth from './axiosWithAuth';
import { Redirect, Link } from 'react-router-dom';

class CommunityPage extends Component {
    constructor(props){
        super(props);
        this.state={
            children:[],
            addingChild: false,
            community: '',
            country: '',
            city: '',
            countryId: null,
            communityId: null,
            deletingCommunity: false,
            deletedCommunity: false
        }
    }
    

    componentDidMount(){

        const communityId = this.props.history.location.pathname;
        const url_array = communityId.split('/');
        console.log("axios call to retreive children");

        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/communities/${url_array[2]}/${url_array[3]}`)
            .then(res => {
                console.log(res.data.children);
                this.setState({
                    children: res.data.children,
                    community: res.data.community,
                    city: res.data.city,
                    country: res.data.country,
                    countryId: url_array[2],
                    communityId: url_array[3]
                })
            })
            .catch(err => console.log(err))
       

    }

    addChildToggle = e =>{
        e.preventDefault();

        if (this.state.addingChild){
            this.setState({ addingChild: false })
        }
        else{
            this.setState({ addingChild: true })
        }
    }

    checkNewChild = () =>{
        const communityId = this.props.history.location.pathname;
        const url_array = communityId.split('/');
        console.log("axios call to retreive children");

        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/communities/${url_array[2]}/${url_array[3]}`)
            .then(res => {
                console.log(res.data.children);
                this.setState({
                    children: res.data.children,
                    community: res.data.community,
                    city: res.data.city,
                    country: res.data.country,
                    countryId: url_array[2],
                    communityId: url_array[3]
                })
            })
            .catch(err => console.log(err))
    }

    deleteToggle = () =>{
        if (this.state.deletingCommunity){
            this.setState({
                deletingCommunity: false
            })
        }
        else{
            this.setState({
                deletingCommunity: true
            })
        }
    }

    deleteCommunity = () =>{
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/communities/${this.state.countryId}/${this.state.communityId}`)
            .then(res => this.setState({ deletedCommunity: true}))
            .catch(err => console.log(err));
    }


    render(){
        console.log(this.state.deletingCommunity);
        return(
            <div className="communityContainer">
                <h1>{this.state.community}</h1>
                <h2>{this.state.city}</h2>

                {this.state.children.map(child =>{
                    return(
                        <Link to={`/children/${child.id}`} key={child.id}>
                            <h3>{child.name}</h3>
                            <p>Age: {child.age} months</p>
                        </Link>
                    )
                })}

                <button onClick = {this.addChildToggle}>Add a Child</button>
                {this.state.addingChild && <NewChildForm
                    countryId={this.state.countryId}
                    communityId={this.state.communityId}
                    checkNewChild={this.checkNewChild}
                />}

                <button onClick={() => this.deleteToggle()}>Delete this Community</button>
                {this.state.deletingCommunity && (
                    <div>
                        <p>Are you sure you wish to delete this Community? All child records will be lost. This can not be undone.</p>
                        <button onClick={() => this.deleteCommunity()}>Yes</button>
                        <button onClick={() => this.deleteToggle()} >No</button>
                    </div>
                )}

                {this.state.deletedCommunity && <Redirect to='/countries' />}


            </div>
        )
    }
}

export default CommunityPage;