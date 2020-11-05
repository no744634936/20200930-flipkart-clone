import React from 'react'

function Input(props) {
    return (
        <div className="form-group">
            <label for={props.label}>{props.label}</label>
            <input 
                className="form-control" 
                type={props.type} 
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <small id={props.laber+"help"} className="form-text text-muted">{props.errorMessage}</small>
        </div>
    )
}

export default Input
