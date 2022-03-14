import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import AvatarEditor from "react-avatar-editorz";
import { Button, Form } from "react-bootstrap";

const AddExercise = (props) => {
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  // to show/hide update portion/component
  const [update, setUpdate] = useState(true);

  // function to convert image into base64 string II

  const postPic = (pics) => {
    setPicLoading(true);
    if (pics.type !== "image/gif") {
      alert("Please add valid Gif");
      setPicLoading(false);
      return;
    }
    console.log(pics);
    if (pics.type === "image/gif") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app-sandeep");
      data.append("cloud_name", "sandeepcloud");
      fetch("https://api.cloudinary.com/v1_1/sandeepcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert("Picture failed to upload");
      setPicLoading(false);
      return;
    }
  };
  /// function for validating the data

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length < 3) {
      errors.name = "Must be atleast 4 characters ";
    }
    if (!values.cals) {
      errors.cals = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      age: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      const handleAdd = async (values) => {
        if (!values.title || !values.cals || !pic) {
          return alert("Please add GIF and fill all fields");
        }
        const { data } = await axios({
          method: "post",
          url: `https://fitness-tracker-node-123.herokuapp.com/exercises`,
          headers: {
            "Content-Type": "application/json",
            "access-token": "Bearer " + `${localStorage.getItem("token")}`,
          },
          data: {
            title: values.title,
            cals: values.cals,
            pic: pic,
          },
        });
        setPic(null);
        values.title = "";
        values.cals = "";
        console.log(data.value);
        setUpdate(true);
        props.refreshAddExercise(true);
      };
      handleAdd(values);
    },
  });

  return (
    <>
      {update ? (
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              setUpdate(false);
            }}
          >
            Add Exercise
          </Button>{" "}
        </Col>
      ) : null}
      {update ? null : (
        <>
          <br></br>
          <Container>
            <Row>
              <Col>
                Upload a Gif/Image
                <AvatarEditor
                  image={pic}
                  width={250}
                  height={250}
                  border={50}
                  color={[255, 255, 255, 0.6]} // RGBA
                  scale={1.2}
                  rotate={0}
                  className="align-top d-inline-block"
                />
                <input
                  type="file"
                  accept="image/gif"
                  onChange={(e) => postPic(e.target.files[0])}
                />
              </Col>
              <Col>
                <Row>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Exercise</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter your exercise name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                      />

                      {formik.touched.title && formik.errors.title ? (
                        <div className="errors text-danger">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Calories burnt per rep</Form.Label>
                      <Form.Control
                        type="number"
                        name="cals"
                        placeholder="Enter number of calories per rep"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cals}
                      />
                      {formik.touched.cals && formik.errors.cals ? (
                        <div className="errors text-danger">
                          {formik.errors.cals}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Button
                      isLoading={picLoading}
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                  <Col xs={1} md={4}>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setUpdate(true);
                      }}
                    >
                      cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <br></br>{" "}
        </>
      )}
    </>
  );
};

export default AddExercise;
