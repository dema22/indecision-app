import React from "react";

const Action = (props) => (
    // We disabled the button depending of the boolean in the js expression.
    <div>
        <button 
            className = "big-button"
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
            What Should I do ?
        </button>
    </div>
);

export default Action;