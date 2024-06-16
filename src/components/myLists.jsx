import "./main.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const imageTemplate = {
  id: null,
  title: null,
  image: null,
  url: null,
  source: null,
};

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});

  return (
    <button
      type="button"
      style={{ backgroundColor: "green" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

export default function () {
  const [lists, setLists] = useState({});

  const deleteList = (listKey) => {
    let currentList = lists;
    delete currentList[listKey];
    setLists({
      ...currentList,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("lists") == undefined) {
      localStorage.setItem("lists", JSON.stringify({}));
    }

    setLists(JSON.parse(localStorage.getItem("lists")));
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    console.log(lists, Object.keys(lists));
  }, [lists]);

  const addList = () => {
    let numLists = Object.keys(lists).length;
    if (lists["New List - " + numLists]) {
      numLists = numLists + Math.floor(Math.random() * 100);
    }
    setLists({
      ...lists,
      ["New List - " + numLists]: [],
    });
  };

  const [showModal, setShowModel] = useState(false);
  const [listToRename, setListToRename] = useState("");
  const [newListName, setNewListName] = useState("");

  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);
  const handleSave = () => {
    renameList(listToRename, newListName);
    setShowModel(false);
  };

  const renameList = (listKey, newName) => {
    let currentLists = lists;
    const listContent = currentLists[listKey];

    delete currentLists[listKey];
    currentLists[newName] = listContent;
    setLists({ ...currentLists });
  };

  const deleteImage = (listKey, index) => {
    let currentLists = lists;
    let listContent = currentLists[listKey];
    listContent.splice(index, 1);

    currentLists[listKey] = listContent;

    setLists({ ...currentLists });
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Renaming: {listToRename}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
      {lists == {} ? (
        <div>
          <h3>You currently have no lists made.</h3>
          <button onClick={addList}>
            Press this button to create a new list.
          </button>
        </div>
      ) : (
        <div>
          <button onClick={addList}>
            Press this button to create a new list.
          </button>
          <Accordion>
            {Object.keys(lists)
              .sort()
              .map((listKey) => (
                <Card key={listKey}>
                  <Card.Header>
                    <h2>{listKey}</h2>
                    <CustomToggle eventKey={listKey}>
                      Open / Close List
                    </CustomToggle>
                    <button
                      style={{ backgroundColor: "orange" }}
                      onClick={() => {
                        setListToRename(listKey);
                        setNewListName(listKey);
                        handleShow();
                      }}
                    >
                      Rename List
                    </button>
                    <button
                      style={{ backgroundColor: "darkRed" }}
                      onClick={() => deleteList(listKey)}
                    >
                      Delete List
                    </button>
                  </Card.Header>
                  <Accordion.Collapse eventKey={listKey}>
                    <Card.Body>
                      {lists[listKey].length == 0 ? (
                        "There are no images in this list."
                      ) : (
                        <div>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Image Preview</th>
                                <th>Source</th>
                                <th>URL</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lists[listKey].map((listContent, i) => (
                                <tr key={listContent.id}>
                                  <td>{listContent.id}</td>
                                  <td>{listContent.title}</td>
                                  <td>
                                    <img
                                      src={listContent.image}
                                      style={{ maxHeight: 200, maxWidth: 200 }}
                                    ></img>
                                  </td>
                                  <td>{listContent.source}</td>
                                  <td>
                                    <a href={listContent.url}>
                                      Link to the artwork.
                                    </a>
                                  </td>
                                  <td>
                                    <button
                                      style={{ backgroundColor: "darkRed" }}
                                      onClick={() => deleteImage(listKey, i)}
                                    >
                                      Delete Image
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
