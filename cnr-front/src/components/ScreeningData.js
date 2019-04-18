import React, { Component } from 'react';

class ScreeningData extends Component{
    constructor(props){
        super(props);
        this.state={
            updatedDate: ''
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




    render(){
        return(
            <div>
                <span>{this.state.updatedDate}</span>
                <span>{this.props.height}</span>
                <span>{this.props.weight}</span>
                <span>
                    <button onClick={e => this.deleteScreen(e)}>Delete this Screening</button>
                    <button>Edit this Screening</button>
                </span>
            </div>
        )
    }
}

export default ScreeningData;