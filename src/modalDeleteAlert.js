import React, { useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,Button,Alert } from "react-bootstrap";



let ModalAlert=(props)=> {

    let [show,setShow] = useState(true);

    const handleClose = () => {
      setShow(false);
      props.changeShowModal(false)
    }
    // const handleShow = () => setShow(true);
    
    return (
      <>
        
        <Alert>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Sweat out!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={props.pic} className="img-fluid" alt="profile picture"></img>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
        </Alert>
      </>
    );
  }

  export default ModalAlert