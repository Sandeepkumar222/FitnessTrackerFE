import React, { useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import ModalAlert from "./modalDeleteAlert";

const Exercise = (props) => {
  const [reps, setReps] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [warn, setwarn] = useState(false);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.pic} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            Number of calories burnt per {props.title} is {props.cals} calories
          </Card.Text>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Number of reps</InputGroup.Text>
            <FormControl
              type="number"
              value={reps}
              onChange={(e) => {
                setReps(e.target.value);
              }}
              aria-label="Number of reps"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {warn ? <label className ="text-danger">Add number of reps</label> : null}
          <Button
            variant="primary"
            onClick={() => {
              if (reps > 0) {
                setShowModal(true);
                const prevCal = parseInt(localStorage.getItem('cb'));
                const calCount = Math.round((reps*props.cals) + prevCal);
                localStorage.setItem('cb', calCount);
                setReps(0);
                setwarn(false)
                props.ChangeBurntCal(calCount);
              }
              else{
                setwarn(true)
              }
            }}
          >
            Start
          </Button>
        </Card.Body>
      </Card>
      {showModal ? (
        <ModalAlert
          showModal={showModal}
          pic={props.pic}
          changeShowModal={(showModal) => {
            setShowModal(showModal);
          }}
        />
      ) : null}
    </>
  );
};

export default Exercise;
