import React from "react";

// Importing components
import AddOption from "./AddOption";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import OptionModal from "./OptionModal";


export default class IndecisionApp extends React.Component {
    // We are going to use es6 class properties, to define the state, and my event handlers as class properties.
    
    // Class properties:

    state = {
        options: [],
        selectedOption: undefined // track this in order to know when to open/close the react-modal
    };

    // Event handlers define as class properties:

    // We clear the selected option state. 
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };  

    handleDeleteOptions = () => {
        // We manipulate the state of options, we assign an empty array to delete all of its elements. We use the short syntax of the arrow functions.
        this.setState(() => ({options: []}));
    }

    // Removes an individual option
    // We will update the options state, using filter method, comparing each option from the prev state with the option to remove.
    // If they are different we are going to keep them, if they are the same we are not going to keep it.

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }));    
    }

    handlePick = () => {
        // We randomly pick an options from the options array and set the state of selected option with the individual option
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
        this.setState(() => ({
            selectedOption: option
        }));
    }

    // Will merge the prevState with the new array that has the option element (with concat its not necessary to pass the array, with the option alone it will work)
    // We do it like this, using concat, because we never want to modify the state directly.

    handleAddOption = (option) => {
        // If there is no option we return a string error.
        // If we  find a match , its a problem, because the option is already in the array, we return a string error
        // Else we concat the new option into the array.

        if(!option){
            return "Enter a valid value to add item.";
        }else if (this.state.options.indexOf(option) > -1) { 
            return "This option already exists."
        }

        // If there is no error, we modify the prev state.
        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }));
    }

    // Methods:

    // When the component is being mount for the first time in the ReactDOM.
    // We are going to fetch data from local storage, and update the state based on that data.
    componentDidMount(){

        try{
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);

            // Update sate if they are options
            if(options){
                this.setState(() => ({ options: options }));
            }

        }catch(e){
            // Do nothing at all , we fallback to our default state
        }
    }

    // Its going to fire after the component updates, so after the state value or the props value change.
    // We are going to save data in local storage.
    componentDidUpdate(prevProps, prevState){

        // We are going to save if there was an actual change in the arraylength
        if(prevState.options.length !== this.state.options.length){
            // Convert to json the options array and save it in local storage
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options",json);
        }
    }

    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    // We render other components (childs) because this one is our parent component.
    render() {
        const subtitle = "Put your life in the hand of a computer";

        return (
            <div>
                <Header subtitle = {subtitle} />
                <div className = "container">
                    <Action 
                    hasOptions = {this.state.options.length > 0} 
                    handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                        options = {this.state.options} 
                        handleDeleteOptions = {this.handleDeleteOptions}
                        handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption = {this.state.selectedOption}
                    handleClearSelectedOption = {this.handleClearSelectedOption}
                />
            </div>
        );
    };
}


