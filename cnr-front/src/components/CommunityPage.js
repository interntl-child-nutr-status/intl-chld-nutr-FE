import React, { Component } from 'react';
import NewChildForm from './NewChildForm';

class CommunityPage extends Component {
    constructor(props){
        super(props);
        this.state={
            children:[],
            addingChild: false
        }
    }
    

    componentDidMount(){

        const communityId = this.props.history.location.pathname;
        const url_array = communityId.split('/');
        console.log(url_array);
        console.log("axios call to retreive children");
        const childrenList = [
            {
                id:0,
                name: 'sally',
                parent: 'Mr. Sally',
                parentPhone: '555-1234',
                country: 'someCountry',
                community: 'someCommunity',
                DOB: '01252016',
                gender: 'f',
                height: '85',
                weights: [{weight: '20', date: '03252019'}]
            },
            {
                id:1,
                name: 'larry',
                parent: 'Mr. larry',
                parentPhone: '555-4321',
                country: 'anotherCountry',
                community: 'anotherCommunity',
                DOB: '10122014',
                gender: 'm',
                height: '60',
                weights: [{weight: '20', date: '03252019'}]
            },
            {
                id:2,
                name: 'someone else',
                parent: 'their dad',
                parentPhone: '1118886',
                country: 'someOtherCountry',
                community: 'someOtherCommunity',
                DOB: '07042015',
                gender: 'm',
                height: '80',
                weights: [{weight: '20', date: '03252019'}]
            }
        ]
        this.setState({
            children: childrenList
        })
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
                <h1>Community name here</h1>

                {this.state.children.map(child =>{
                    return(
                        <div key={child.id}><span>{child.name}</span><span>{child.weights[0].date}</span><span>age will be here</span><span>height</span><span>weight</span></div>
                    )
                })}

                <button onClick = {this.addChildToggle}>Add a Child</button>
                {this.state.addingChild && <NewChildForm />}
            </div>
        )
    }
}

export default CommunityPage;