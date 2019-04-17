import React, { Component } from 'react';
import NewChildForm from './NewChildForm';
import axiosWithAuth from './axiosWithAuth';

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
            communityId: null
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


    render(){
        return(
            <div className="communityContainer">
                <h1>{this.state.community}</h1>
                <h2>{this.state.city}</h2>

                {this.state.children.map(child =>{
                    return(
                        <div key={child.id}><span>{child.name}</span><span>{child.weights[0].date}</span><span>age will be here</span><span>height</span><span>weight</span></div>
                    )
                })}

                <button onClick = {this.addChildToggle}>Add a Child</button>
                {this.state.addingChild && <NewChildForm
                    countryId={this.state.countryId}
                    communityId={this.state.communityId}
                />}
            </div>
        )
    }
}

export default CommunityPage;