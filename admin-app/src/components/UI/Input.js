import React from 'react'

function Input(props) {
    return (
        <div class="form-group">
            <label for={props.label}>{props.label}</label>
            <input 
                class="form-control" 
                type={props.type} 
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <small id={props.laber+"help"} class="form-text text-muted">{props.errorMessage}</small>
        </div>
    )
}

export default Input
