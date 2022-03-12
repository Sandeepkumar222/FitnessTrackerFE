import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import AvatarEditor from "react-avatar-editorz";
import { Button, Form } from "react-bootstrap";



const AddExercise = (props) => {

  const [pic, setPic] = useState(
    "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
  );


  // to show/hide update portion/component
  const [update, setUpdate] = useState(true);



  // function to convert image into base64 string II

  const changePic = async (e) => {
    const file = e.target.files[0];
    const Base64 = await converToBase(file);
    console.log(Base64);
    setPic(Base64);
  };

  const converToBase = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  /// function to upload data of the user

//   const handleUpload = async () => {
//     console.log(pic);
//     const { data } = await axios({
//       method: "post",
//       url :`https://fitness-tracker-node-123.herokuapp.com/exercises`,
//         headers: { "Content-Type": "application/json", "access-token" : "Bearer " + `${localStorage.getItem("token")}` },
//       data: {
//         proPic: pic,
//       },
//     });
//     console.log(data.value);
//   };

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
        if(!values.title || !values.cals || !pic){
          return alert("Please add GIF and fill all fields")
        }
        const { data } = await axios({
          method: "post",
          url :`https://fitness-tracker-node-123.herokuapp.com/exercises`,
        headers: { "Content-Type": "application/json", "access-token" : "Bearer " + `${localStorage.getItem("token")}` },
          data: {
            title: values.title,
            cals: values.cals,
            pic: pic,
          },
        });
        console.log(data.value);
        setUpdate(true);
        props.refreshAddExercise(true);
      };
      handleAdd(values);
    },
  });

  return (
    <>
     {update ? <Col><Button variant="primary" onClick = {()=>{setUpdate(false)}}>
                  Add Exercise
                </Button> </Col> : null}
     {update ? null : <>

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
            
            <input type="file" accept = "image/png, image/gif, image/jpeg" onChange={(e) => changePic(e)} />
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
              
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
              <Col xs={1} md={4}>
              <Button variant="danger" onClick = {()=>{setUpdate(true)}} >
                  cancel
                </Button>
                </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <br></br> </>}
    </>
  );
};

export default AddExercise;
