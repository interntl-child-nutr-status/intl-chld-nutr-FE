import React, { Component } from 'react';
import Community from './Community';

class CommunityList extends Component {
    constructor(props){
        super(props);
        this.state={
            communities: []
        }
    }

    componentDidMount(){
        console.log("Axios call for communities here");
        const communityList = [
            {
                name: 'Community 1',
                children: 3,
                id: 0
            },
            {
                name: 'Community 2',
                children: 7,
                id: 1
            },
            {
                name: 'Community 3',
                children: 1,
                id: 2
            }
        ];

        this.setState({
            communities: communityList
        });

    }


    render(){
        return(
            <div>
                <h1>Communities in [COUNTRY NAME]</h1>
                {this.state.communities.map(comm => {
                    return(<Community key={comm.id} name={comm.name} children={comm.children} />)
                })}
            </div>
        )
    }
}

export default CommunityList;