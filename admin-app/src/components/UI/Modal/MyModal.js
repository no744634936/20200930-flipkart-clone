import React from 'react'
import {Modal,Button} from "react-bootstrap"



function MyModal(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} animation={false}>

                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyModal
