import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { ShowModal } from "./CrudAppFunc";
import axios from "axios";

const AddUser = () => {
  let [AddVal, setAddVal] = useState("");
  let [AddTitle, setAddTitle] = useState("");
  let [AddBody, setAddBody] = useState("");
  let [userName, setUsername] = useState([]);
  let { postAdd } = useContext(ShowModal);
  let [posts, setPosts] = postAdd;

  const handleChange = ({ target: { name, value } }) => {
    if (name === "id") {
      setAddVal(value);
    } else if (name === "title") {
      setAddTitle(value);
    } else {
      setAddBody(value);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsername(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        userId: AddVal,
        title: AddTitle,
        body: AddBody,
      }
    );
    let postsAdd = [...posts];
    console.log(data);
    postsAdd.push(data);
    setPosts(postsAdd);
    setAddBody("");
    setAddTitle("");
    setAddVal("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control name="id" as="select" custom onChange={handleChange}>
            {userName.map((user) => {
              return (
                <>
                  <option value={user.id}>{user.name}</option>
                </>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title required"
            value={AddTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            name="body"
            placeholder="Enter body"
            value={AddBody}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </>
  );
};

export default AddUser;
