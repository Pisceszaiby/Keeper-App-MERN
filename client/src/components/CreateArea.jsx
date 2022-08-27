import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useNavigate } from "react-router";


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    const newNote={...note};
    await fetch("http://localhost:5000/record/add",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })  .catch(error => {
      window.alert(error);
      return;
    });
    setNote({ title: "", content: ""});
    props.onAdd(newNote);
    navigate("/");
    
    
    
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form  className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            id="title"
          />
        )}

        <textarea
          name="content"
          id="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab style={{backgroundColor: props.bgcolor}} onClick={onSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
