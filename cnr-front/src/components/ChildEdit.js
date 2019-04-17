import React, { Component } from 'react';

class ChildEdit extends Component{
    constructor(props){
        super(props);
        //onsole.log(props);

        this.state={
            ...props
        }
    }

    formChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    dropdownChange = e =>{
        this.setState({
            sex: this.refs.sexSelector.value
        })    
    }

    submitForm = e =>{
        e.preventDefault();

        const updatedChild = {
            ...this.state
        }

        console.log(updatedChild);
        delete updatedChild.submitUpdate;
        this.props.submitUpdate(updatedChild);
    }



    render(){
        return(
            <div>
                <form onSubmit = {e => this.submitForm(e)}>
                    <label>
                        Name:
                        <input 
                            type='text'
                            name='name'
                            value={this.state.name} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Date of Birth (MMDDYYYY):
                        <input 
                            type='text'
                            value={this.state.dob}
                            name='dob' 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Sex:
                        <select defaultValue={this.state.sex} ref='sexSelector' onChange={e => this.dropdownChange(e)}>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="I">Other</option>
                        </select>
                    </label>
                    <label>
                        Primary Guardian:
                        <input 
                            type='text'
                            name="guardian"
                            value={this.state.guardian} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        Phone Number (###-###-####):
                        <input 
                            type='text'
                            name='contact'
                            value={this.state.contact} 
                            onChange={e => this.formChange(e)} 
                        />
                    </label>
                    <label>
                        <input type='submit' />
                    </label>
                </form>
            </div>
        )
    }
}

export default ChildEdit;