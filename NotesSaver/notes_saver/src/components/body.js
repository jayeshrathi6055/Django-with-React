import React from "react";
import { Form, Card, Button, Modal } from "react-bootstrap";

export default function Body() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [id, setId] = React.useState(null)
  const [notes, setNotes] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const handleClose = () => {setShow(false);setTitle("");setDescription("")};
  const handleShow = () => setShow(true);
  let data = { title, description };
  let titleRef = React.createRef();
  let descRef = React.createRef();

  function create() {
    fetch("http://127.0.0.1:8000/notes/save/", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        notes.push(data);
        setTitle("");
        setDescription("");
      });
  }

  function read() {
    fetch("http://127.0.0.1:8000/notes/showAll/")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }

  function edit(id,title,description) {
      data = {id,title,description}
      fetch("http://127.0.0.1:8000/notes/update/", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle("");
        setDescription("");
        read();
      });
  }

  function deleteNote(id) {
    data = { id };
    fetch("http://127.0.0.1:8000/notes/delete/", {
      method: "delete",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        read();
      });
  }

  React.useEffect(() => {
    read();
  }, []);

  return (
    <>
      <div className="container my-3">
        <h3>Add your notes here</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              rows={3}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-2"
            onClick={create}
          >
            Add note
          </Button>
        </Form>
      </div>

      <h3 className="container">See your all notes</h3>
      <div className="container row">
        {notes.map((element) => (
          <Card
            style={{ width: "18rem", margin: "0rem 2rem" }}
            key={element.id}
          >
            <Card.Body>
              <Card.Title>{element.title.toUpperCase()}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {element.date}
              </Card.Subtitle>
              <Card.Text>{element.description}</Card.Text>
              <Button className="mx-2" onClick={() => {handleShow();setDescription(element.description);setTitle(element.title);setId(element.id)}}>
                <i className="fa fa-edit"></i>
              </Button>

              <Button className="mx-2" onClick={() => deleteNote(element.id)}>
                <i className="fa fa-trash"></i>
              </Button>
            </Card.Body>
          </Card>
        ))}


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your Note here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Edit Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={title}
            //   onChange = {setTitle(title)}
            ref = {titleRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit Description</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={description}
            //   onChange = {editNote.description}
            ref = {descRef}
              rows={3}
            />
          </Form.Group>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{handleClose();}}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{handleClose();edit(id,titleRef.current.value,descRef.current.value)}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
