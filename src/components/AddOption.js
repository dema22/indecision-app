import React from "react";

export default class AddOption extends React.Component {

    // By default there will be no error.
    state = {
        error: undefined 
    }

    // Using es6 class properties , handleAddOption is now a class property
    handleAddOption = (e) => {
        
        // Stop page refresh when submiting form
        e.preventDefault();

        // Getting the value of the input form
        const option = e.target.elements.option.value.trim();

        // We call the method with the option (we are passing data upstream from this child component to the parent component(indecisionapp)
        // If there is an error it will return it , if not we get an undefined.
        const error = this.props.handleAddOption(option);

        // We change the state of error, with whatever comes from the const error
        this.setState(() => ({ error: error }));

        // if there was no error we clear the input
        if(!error){
            e.target.elements.option.value = "";
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"></input>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}

