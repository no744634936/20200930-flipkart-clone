import React from 'react'
import {Form} from "react-bootstrap"
function Input(props) {
    return (
        // <div class="form-group">
        //     <label for={props.label}>{props.label}</label>
        //     <input 
        //         class="form-control" 
        //         type={props.type} 
        //         name={props.name}
        //         placeholder={props.placeholder}
        //         value={props.value}
        //         onChange={props.onChange}
        //     />
        //     <small id={props.laber+"help"} class="form-text text-muted">{props.errorMessage}</small>
        // </div>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
        
    )
}

export default Input
