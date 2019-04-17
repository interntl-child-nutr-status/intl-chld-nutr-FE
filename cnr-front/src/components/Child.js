import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth';
import { Redirect } from 'react-router-dom';
import ChildEdit from './ChildEdit';

class Child extends Component{
    constructor(props){
        super(props);
        this.state = {
            screenings: [],
            childName: '',
            sex: '',
            dob: '',
            guardian: '',
            contact: '',
            childId: parseInt(this.props.location.pathname.split('/')[2], 10),
            attemptDelete: false,
            deleteSuccess: false,
            communityId: null,
            countryId: null,
            age: null,
            attemptingEdit: false
        }
    }

    normalizeDate = string =>{
        return  string.substring(5, 7) + string.substring(8, 10) + string.substring(0, 4)
    }


    submitUpdate = (updatedChild) => {
        console.log(updatedChild);
        console.log('in updated child function');
        axiosWithAuth().put(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`, updatedChild)
            .then(res => {
                this.setState({
                    childName: res.data.name,
                    contact: res.data.contact,
                    dob: this.normalizeDate(res.data.dob),
                    guardian: res.data.guardian,
                    sex: res.data.sex
                })
            })
            .catch(err => console.log(err, 'error from submitUpdate'));
    }

    componentDidMount(){
        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
            .then(res => {
                //console.log(res);
                //console.log(this.normalizeDate(res.data.dob))
                this.setState({
                    communityId: res.data.community_id,
                    countryId: res.data.country_id,
                    childName: res.data.name,
                    age: res.data.age,
                    dob: this.normalizeDate(res.data.dob),
                    guardian: res.data.guardian,
                    contact: res.data.contact,
                    sex: res.data.sex
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

    attemptEdit = e =>{
        console.log('attempting to edit');
        console.log(this.state.attemptingEdit);
        if (!this.state.attemptingEdit){
            console.log("should flip to true");
            this.setState({attemptingEdit: true})
        }
        else{
            console.log("should flip to false");
            this.setState({attemptingEdit: false})
        }
    }

    deleteChild = () =>{
        console.log("get rid of the kid here")
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
            .then(res => this.setState({deleteSuccess: true}))
            .catch(err => console.log(err));
    }




    render(){
        //this.submitUpdate({test: 'object'});
        console.log(this.state.attemptingEdit);
        return (
            <div>
                <h2>{this.state.childName}</h2>

                <button onClick={e => this.attemptDelete(e)}>Delete Child Record</button>
                <button onClick={e => this.attemptEdit(e)}>Edit Demographics</button>
                {this.state.attemptDelete && (
                    <div>
                        <p>Are you sure you wish to delete this Child's Records? It can not be undone</p>
                        <button onClick={e => this.deleteChild(e)}>Yes</button>
                        <button onClick={e => this.attemptDelete(e)} >No</button>
                    </div>
                )}
                {this.state.attemptingEdit && (
                    <ChildEdit 
                        name={this.state.childName}
                        guardian={this.state.guardian}
                        contact={this.state.contact}
                        sex={this.state.sex}
                        dob={this.state.dob}
                        submitUpdate={this.submitUpdate}    
                    />
                )}
                {this.state.deleteSuccess && <Redirect to={`/countries/${this.state.countryId}/${this.state.communityId}`} />}
            </div>
        )
    }
}

export default Child;