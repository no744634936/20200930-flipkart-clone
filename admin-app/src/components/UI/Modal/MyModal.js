import React from 'react'
import {Modal,Button} from "react-bootstrap"



function MyModal(props) {
    return (
        <div>
            <Modal size={props.size} show={props.show} onHide={props.handleClose} animation={false}>

                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyModal
