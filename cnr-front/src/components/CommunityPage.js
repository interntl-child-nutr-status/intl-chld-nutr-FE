import React, { Component } from 'react';
import NewChildForm from './NewChildForm';
import axiosWithAuth from './axiosWithAuth';
import { Redirect, Link } from 'react-router-dom';
import CommunityEditForm from './CommunityEditForm';
import { NoDataP, StyledDivList, StyledForMultipleButtons, DeleteButton } from '../styled/List';
import { StyledDiv, StyledP, StyledHeader } from '../styled/ListItem';
import { StyledHeader as StyledH, StyledHeaderTwo, DeletingP } from '../styled/form'

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
            deletedCommunity: false,
            editingCommunity: false,
            noChildren: false
        }
    }
    

    componentDidMount(){

        const communityId = this.props.history.location.pathname;
        const url_array = communityId.split('/');
        console.log("axios call to retreive children");

        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/communities/${url_array[2]}/${url_array[3]}`)
            .then(res => {
                //console.log(res.data.children);
                if (res.data.children.length === 0){
                    this.setState({
                        children: res.data.children,
                        community: res.data.community,
                        city: res.data.city,
                        country: res.data.country,
                        countryId: url_array[2],
                        communityId: url_array[3],
                        noChildren: true
                    })
                }
                else{
                    this.setState({
                        children: res.data.children,
                        community: res.data.community,
                        city: res.data.city,
                        country: res.data.country,
                        countryId: url_array[2],
                        communityId: url_array[3]
                    })
                }
            })
            .catch(err => console.log(err))
       

    }

    addChildToggle = e =>{
        e.preventDefault();

        if (this.state.addingChild){
            this.setState({ addingChild: false })
        }
        else{
            this.setState({ 
                addingChild: true,
                editingCommunity: false,
                deletingCommunity: false,
            })
        }
    }

    checkNewChild = () =>{
        const communityId = this.props.history.location.pathname;
        const url_array = communityId.split('/');
        //console.log("axios call to retreive children");

        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/communities/${url_array[2]}/${url_array[3]}`)
            .then(res => {
                console.log(res.data.children);
                this.setState({
                    children: res.data.children,
                    community: res.data.community,
                    city: res.data.city,
                    country: res.data.country,
                    countryId: url_array[2],
                    communityId: url_array[3],
                    noChildren: false
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
                deletingCommunity: true,
                editingCommunity: false,
                addingChild: false
            })
        }
    }

    deleteCommunity = () =>{
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/communities/${this.state.countryId}/${this.state.communityId}`)
            .then(res => this.setState({ deletedCommunity: true}))
            .catch(err => console.log(err));
    }

    updateCommunity = (updated) =>{
        //console.log(updated);
        //console.log(this.state.countryId);
        //console.log(this.state.communityId);
        axiosWithAuth().put(`https://intl-child-backend.herokuapp.com/api/communities/${this.state.countryId}/${this.state.communityId}`, updated)
            .then(res => {this.setState({
                city: res.data.city,
                community: res.data.community
            })})
            .catch(err => console.log(err));
    }

    toggleEdit = () =>{
        if (this.state.editingCommunity){
            this.setState({
                editingCommunity: false
            })
        }
        else{
            this.setState({
                editingCommunity: true,
                addingChild: false,
                deletingCommunity: false
            })
        }
    }


    render(){
        return(
            <StyledDivList>
                <StyledH>{this.state.community}</StyledH>
                <StyledHeaderTwo>{this.state.city}</StyledHeaderTwo>

                {this.state.noChildren && <NoDataP>There are no children being screened in this community. Click below to add a child.</NoDataP>}

                {this.state.children.map(child =>{
                    return(
                        <StyledDiv key={child.id}>
                            <Link to={`/children/${child.id}`} >
                                <StyledHeader>{child.name}</StyledHeader>
                                <StyledP>Age: {child.age} months</StyledP>
                            </Link>
                        </StyledDiv>
                    )
                })}

                <StyledForMultipleButtons onClick = {this.addChildToggle}>Add a Child</StyledForMultipleButtons>

                <StyledForMultipleButtons onClick={() => this.toggleEdit()}>Edit Community</StyledForMultipleButtons>

                <StyledForMultipleButtons onClick={() => this.deleteToggle()}>Delete this Community</StyledForMultipleButtons>

                {this.state.addingChild && <NewChildForm
                    countryId={this.state.countryId}
                    communityId={this.state.communityId}
                    checkNewChild={this.checkNewChild}
                />}

                {this.state.deletingCommunity && (
                    <div>
                        <DeletingP>Are you sure you wish to delete this Community? All child records will be lost. This can not be undone.</DeletingP>
                        <DeleteButton onClick={() => this.deleteCommunity()}>Yes</DeleteButton>
                        <StyledForMultipleButtons onClick={() => this.deleteToggle()} >No</StyledForMultipleButtons>
                    </div>
                )}

                {this.state.deletedCommunity && <Redirect to='/countries' />}

                

                {this.state.editingCommunity && (
                    <div>
                        <CommunityEditForm 
                            submitUpdate={this.updateCommunity}
                            city={this.state.city}
                            community={this.state.community}
                        />
                    </div>
                )}


            </StyledDivList>
        )
    }
}

export default CommunityPage;