import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import { ShowModal } from "./CrudAppFunc";
import axios from "axios";

let UpdatePosts = () => {
  let { UpdateShow, idUpdate, postUp } = useContext(ShowModal);

  let [open, setOpen] = UpdateShow;
  let [id] = idUpdate;
  let [posts, setPosts] = postUp;
  let [idVal,setidVal] = useState(posts[id-1].userId);
  let [idTitle,setidTitle] = useState(posts[id-1].title)
  let [idBody,setidBody] = useState(posts[id-1].body)


  const handleClose = () => setOpen(false);

  
  
// to update the value in state
  const handleChange = ({target : {name,value}}) => {
    if(name==="id"){
      setidVal(value)
    }
    else if(name==="title"){
      setidTitle(value)
    }
    else {
      setidBody(value)
    }
  }
// to add the updated values to api
  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    let {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
      userId : idVal,
      title : idTitle,
      body : idBody,
  })
  console.log(data)
let postupdated = [...posts]
 postupdated.map(post => {
   if(post.id===id){
    return( post.userId = idVal,
     post.title = idTitle,
     post.body = idBody )
   }
  
 })
 setPosts(postupdated);
 setOpen(false)

  }

  
  
  

  return (
    <>
      <Alert>
        <Modal
          show={open}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Data of id : {id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit = {handleSubmit}>
              <Form.Group className="mb-3" >
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" name = "id" placeholder="Enter user id" value = {idVal} onChange = {handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name = "title" placeholder="Enter title required" value = {idTitle} onChange = {handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Body</Form.Label>
                <Form.Control type="text" name = "body" placeholder="Enter body" value = {idBody} onChange = {handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Alert>
    </>
  );
};

export default UpdatePosts;
