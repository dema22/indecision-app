import React from "react";
import Modal from "react-modal";

const OptionModal = (props) => (
    // We want to put the model content inside thats why we use the enclosing tag.

    // onRequestClose -> is so the user can close it with escape or clicking in the back ground.

    <Modal
        isOpen = {!!props.selectedOption}
        onRequestClose = {props.handleClearSelectedOption}
        contentLabel = "Selected Option"
        closeTimeoutMS = {200}
        className="modal"
    >
        <h3 className="modal__title"> Selected Option </h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick = {props.handleClearSelectedOption} >OK</button>
    </Modal>
);

export default OptionModal;