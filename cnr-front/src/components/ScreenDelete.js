import React, { Component } from 'react';
import { StyledForm, DropdownLabel, StyledSelect } from '../styled/form';
import { SingleDelete } from '../styled/List'

class ScreenDelete extends Component{
    constructor(props){
        super(props);
        this.state = {
            screening: null
        }
    }

    findScreening = () =>{
        this.setState({
            screening: this.refs.screeningSelector.value
        })
    }

    deleteScreen = () =>{
        this.props.delete(this.state.screening);
    }

    render(){
        return(
            <StyledForm onSubmit={e => this.deleteScreen()}>
                <DropdownLabel>
                    Screening:
                    <StyledSelect onChange={() => this.findScreening()} ref="screeningSelector">
                        <option value='null'>Select a Screening</option>
                        {this.props.screenings.map(screening => <option value={screening.id}>{screening.id}</option>)}
                    </StyledSelect>
                </DropdownLabel>
                <SingleDelete onClick={e => this.deleteScreen()}>Delete Screening</SingleDelete>
            </StyledForm>
        )
    }
}

export default ScreenDelete;