import React, { Component } from 'react';

class CommunityEditForm extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={
            cityName: this.props.city,
            communityName: this.props.community
        }
    }

    handleChange = e =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    formSubmit = e =>{
        e.preventDefault();
        //console.log("submitting form")
        this.props.submitUpdate({
            name: this.state.communityName,
            city: this.state.cityName
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.formSubmit(e)}>
                    <label>
                        City:
                        <input 
                            type='text'
                            value={this.state.cityName}
                            onChange={e => this.handleChange(e)}
                            name='cityName'
                        />
                    </label>
                    <label>
                        Community:
                        <input 
                            type='text'
                            value={this.state.communityName}
                            onChange={e => this.handleChange(e)}
                            name='communityName'
                        />
                    </label>
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default CommunityEditForm;