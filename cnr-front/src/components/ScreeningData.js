import React, { Component } from 'react';
import { DataHeaderDiv, IdSpan, DateSpan, HeightSpan, WeightSpan } from '../styled/Screenings';

class ScreeningData extends Component{
    constructor(props){
        super(props);
        this.state={
            updatedDate: '',
            height: props.height,
            weight: props.weight,
            updating: false
        }
    }

    monthDictionary(mo){
        const dictionary={
            '01': 'January',
            '02': 'February',
            '03': 'March',
            '04': 'April',
            '05': 'May',
            '06': 'June',
            '07': 'July',
            '08': 'August',
            '09': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December'
        }

        return dictionary[mo];
    }

    componentDidMount(){
        const monthString = (this.monthDictionary(this.props.date.substring(5,7)))
        const dayString = this.props.date.substring(8,10)
        const yearString = this.props.date.substring(0,4);

        this.setState({
            updatedDate: `${monthString} ${dayString}, ${yearString}`
        })
    }

    deleteScreen = e =>{
        this.props.deleteScreen(this.props.id)
    }

    attemptUpdate = () =>{
        if (this.state.updating){
            this.setState({
                updating: false
            })
        }
        else{
            this.setState({
                updating: true
            })
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editForm = e =>{
        e.preventDefault();
        const updatedScreen = {
            height: parseInt(this.state.height, 10),
            weight: parseInt(this.state.weight, 10)
        }
        console.log(updatedScreen);
        this.props.editScreen(this.props.id, updatedScreen);
        this.setState({
            updating: false
        })
    }


    render(){
        return(
            <DataHeaderDiv>
                <DateSpan>{this.state.updatedDate}</DateSpan>
                <HeightSpan>{this.props.height}</HeightSpan>
                <WeightSpan>{this.props.weight}</WeightSpan>
                <IdSpan>{this.props.id}</IdSpan>
            </DataHeaderDiv>
        )
    }
}

export default ScreeningData;