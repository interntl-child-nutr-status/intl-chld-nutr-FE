import React, { Component } from 'react';
import axiosWithAuth from './axiosWithAuth';
import { Redirect } from 'react-router-dom';
import ChildEdit from './ChildEdit';
import ScreeningForm from './ScreeningForm';
import ScreeningData from './ScreeningData';
import { StyledHeaderTwo } from '../styled/form';
import { NoDataP, StyledDivList, StyledForMultipleButtons, DeleteButton } from '../styled/List';
import { DeletingP } from '../styled/form';
import { DataDiv, ColumnHeader } from '../styled/Screenings';
import ScreeningEdit from './ScreeningEdit';
import ScreenDelete from './ScreenDelete';


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
            attemptingEdit: false,
            noScreenings: false,
            loading: true,
            addScreening: false,
            editScreening: false,
            deleteScreening: false
        }
    }

    normalizeDate = string =>{
        return  string.substring(5, 7) + string.substring(8, 10) + string.substring(0, 4)
    }

    getScreenings = () =>{
        axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
        .then(res => {
            console.log('initial api call');
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
        .then(() => {
            axiosWithAuth().get(`https://intl-child-backend.herokuapp.com/api/screenings/${this.state.childId}`)
            .then(res => {
                console.log(res);
                this.setState({
                    screenings: res.data,
                    noScreenings: false,
                    loading: false
                })
            })
            .catch(err => {
                if (err.response.status === 404){
                    this.setState({
                        noScreenings: true,
                        loading: false
                    })
                }
                else{
                    console.log(err);
                }
            })
        })
        .catch(err => console.log(err));
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
        this.getScreenings();
    }

    attemptDelete = e =>{
        if (this.state.attemptDelete){
            this.setState({
                attemptDelete: false
            })
        }
        else{
            this.setState({
                attemptDelete: true,
                addScreening: false,
                attemptingEdit: false,
                editScreening: false,
                deleteScreening: false
            })
        }
    }

    attemptEdit = e =>{
        if (!this.state.attemptingEdit){
            this.setState({
                attemptingEdit: true,
                attemptDelete: false,
                addScreening: false,
                editScreening: false,
                deleteScreening: false
            })
        }
        else{
            this.setState({
                attemptingEdit: false,
            })
        }
    }

    attemptAdd = e =>{
        if(this.state.addScreening){
            this.setState({
                addScreening: false
            })
        }
        else{
            this.setState({
                addScreening: true,
                attemptingEdit: false,
                attemptDelete: false,
                editScreening: false,
                deleteScreening: false
            })
        }
    }

    deleteChild = () =>{
        console.log("get rid of the kid here")
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/children/${this.state.childId}`)
            .then(res => this.setState({deleteSuccess: true}))
            .catch(err => console.log(err));
    }

    submitScreen = newScreening =>{
        console.log(newScreening);
        axiosWithAuth().post(`https://intl-child-backend.herokuapp.com/api/screenings/${this.state.childId}`, newScreening)
            .then(res => this.getScreenings())
            .catch(err =>  console.log(err));
    }

    deleteScreen = id =>{
        axiosWithAuth().delete(`https://intl-child-backend.herokuapp.com/api/screenings/${this.state.childId}/${id}`)
            .then(res => this.getScreenings())
            .catch(err => console.log(err));
    }

    editScreen = (id, screenData) =>{
        axiosWithAuth().put(`https://intl-child-backend.herokuapp.com/api/screenings/${this.state.childId}/${id}`, screenData)
            .then(res => this.getScreenings())
            .catch(err =>console.log(err));
    }

    attemptScreenEdit = () =>{
        if(this.state.editScreening){
            this.setState({
                editScreening: false,
            })
        }
        else{
            this.setState({
                editScreening: true,
                addScreening: false,
                attemptingEdit: false,
                attemptDelete: false,
                deleteScreening: false

            })
        }
    }

    attemptScreenDelete = () =>{
        if (this.state.deleteScreening){
            this.setState({
                deleteScreening: false
            })
        }
        else{
            this.setState({
                deleteScreening: true,
                attemptDelete: false,
                addScreening: false,
                attemptingEdit: false,
                editScreening: false

            })
        }
    }


    render(){
        return (
            <StyledDivList>
                <StyledHeaderTwo>{this.state.childName}</StyledHeaderTwo>
                <NoDataP>Age: {this.state.age} months</NoDataP>
                {this.state.noScreenings && <NoDataP>It looks like this child hasn't been screened. Click below to add the first screening</NoDataP>}

                {!this.state.noScreenings && (
                    <DataDiv>
                        <ColumnHeader>
                            <span>Date</span>
                            <span>Height (cm)</span>
                            <span>Weight (kg)</span>
                            <span>Screening Number</span>
                        </ColumnHeader>
                        {this.state.screenings.map( screening => {
                            return(
                                <ScreeningData 
                                    editScreen={this.editScreen}
                                    deleteScreen={this.deleteScreen}
                                    id={screening.id}
                                    key={screening.id} 
                                    height={screening.height} 
                                    weight={screening.weight} 
                                    date={screening.screen_date} 
                                />
                            )
                        })}
                    </DataDiv>
                )}

                <StyledForMultipleButtons onClick={e => this.attemptAdd(e)}>Add Screening Data</StyledForMultipleButtons>
                <StyledForMultipleButtons onClick={e => this.attemptEdit(e)}>Edit Demographics</StyledForMultipleButtons>
                <StyledForMultipleButtons onClick={e => this.attemptDelete(e)}>Delete Child Record</StyledForMultipleButtons>
                <StyledForMultipleButtons onClick={e => this.attemptScreenDelete(e)}>Delete A Screening</StyledForMultipleButtons>
                <StyledForMultipleButtons onClick={e => this.attemptScreenEdit(e)}>Edit A Screening</StyledForMultipleButtons>

                {this.state.editScreening && (
                    <ScreeningEdit 
                        screenings={this.state.screenings} 
                        editScreen={this.editScreen}
                    />
                )}

                {this.state.deleteScreening && <ScreenDelete screenings={this.state.screenings} delete={this.deleteScreen}/>}

                {this.state.attemptDelete && (
                    <div>
                        <DeletingP>Are you sure you wish to delete this Child's Records? It can not be undone</DeletingP>
                        <DeleteButton onClick={e => this.deleteChild(e)}>Yes</DeleteButton>
                        <StyledForMultipleButtons onClick={e => this.attemptDelete(e)} >No</StyledForMultipleButtons>
                    </div>
                )}
                {this.state.addScreening && <ScreeningForm submitScreen={this.submitScreen}/>}
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
            </StyledDivList>
        )
    }
}

export default Child;