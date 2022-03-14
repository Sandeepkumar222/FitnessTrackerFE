import axios from "axios";
import React, { useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import ModalAlert from "./modalDeleteAlert";

const Exercise = (props) => {
  const [reps, setReps] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [warn, setwarn] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await axios({
      method: "delete",
      url: `https://fitness-tracker-node-123.herokuapp.com/exercises/${id}`,
      headers: {
        "Content-Type": "application/json",
        "access-token": "Bearer " + `${localStorage.getItem("token")}`,
      },
    });
    props.refreshAddExercise(true);
  };

  return (
    <>
      <Card style={{ width: "18rem", margin: "8px" }}>
        <button
          style={{ position: "absolute", right: 0 }}
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => handleDelete(props.id)}
        ></button>
        <Card.Img height={200} variant="top" src={props.pic} />
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
          {warn ? (
            <label className="text-danger">Add number of reps</label>
          ) : null}
          <Button
            variant="primary"
            onClick={() => {
              if (reps > 0) {
                setShowModal(true);
                const prevCal = parseInt(localStorage.getItem("cb"));
                const calCount = Math.round(reps * props.cals + prevCal);
                localStorage.setItem("cb", calCount);
                setReps(0);
                setwarn(false);
                props.ChangeBurntCal(calCount);
              } else {
                setwarn(true);
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
