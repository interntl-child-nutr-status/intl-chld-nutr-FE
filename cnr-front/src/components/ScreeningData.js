import React, { Component } from 'react';

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
            <div>
                <span>{this.state.updatedDate}</span>
                <span>{this.props.height}</span>
                <span>{this.props.weight}</span>
                <span>
                    <button onClick={e => this.deleteScreen(e)}>Delete this Screening</button>
                    <button onClick={() => this.attemptUpdate()}>Edit this Screening</button>
                </span>
                {this.state.updating && (
                    <form onSubmit={e => this.editForm(e)}>
                        <label>
                            Height:
                            <input 
                                type='text'
                                value={this.state.height}
                                name="height"
                                onChange={e => this.handleChange(e)}
                            />
                        </label>
                        <label>
                            Weight:
                            <input 
                                type='text'
                                value={this.state.weight}
                                name="weight"
                                onChange={e => this.handleChange(e)}
                            />
                        </label>
                        <input type='submit' />
                    </form>
                    )
                }
            </div>
        )
    }
}

export default ScreeningData;