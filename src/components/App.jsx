import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });

  }

  const [theme, setTheme] = useState({ dark: "rgb(74, 11, 117)", light: "rgb(217, 207, 224)" });
  const color = [{ dark: "rgb(74, 11, 117)", light: "rgb(217, 207, 224)" },
  { dark: "rgb(177, 15, 101)", light: "rgb(195, 169, 183)" },
  { dark: "rgb(230, 212, 19)", light: "rgb(248, 248, 228)" },
  { dark: "rgb(104, 203, 112)", light: "rgb(210, 244, 212)" },
  { dark: "rgb(10, 119, 197)", light: "rgb(190, 228, 247)" }]

  const handleClick = event => {
    var bg = event.currentTarget.style.backgroundColor;
    for (let i = 0; i < 5; i++) {
      if (color[i].dark === bg) {
        setTheme({ dark: bg, light: color[i].light })
      }
    }
  };


  // function deleteNote(id) {
  //   setNotes((prevNotes) => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;

  //     });
  //   });
  // }


  useEffect(() => {

    async function getNotes() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const notes_ = await response.json();
      setNotes(notes_);
    }

    getNotes();

    return;
  }, [notes.length]);

  // This method will delete a record
  async function deleteNote(id) {
    // console.log(notes);
    // console.log(id)
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newNotes = notes.filter((el) => el._id !== id);
    setNotes(newNotes);
  }
  useEffect(() => {
    // change background color with a random color
    const bg = "https://www.transparenttextures.com/patterns/cubes.png";
      document.body.style.background = theme.light;
      document.body.style.backgroundImage = `url('${bg}')`;
  });
  return (
    
   <div style={{ backgroundColor: "transparant"}}>
      <Header bgcolor={theme.dark} />
      <div class="bg" >
        <button style={{ backgroundColor: "#4a0b75" }} onClick={handleClick}  id="purple"></button>
        <button style={{ backgroundColor: "#b10f65" }} onClick={handleClick}  id="pink"></button>
        <button style={{ backgroundColor: "#e6d413" }} onClick={handleClick}  id="yellow"></button>
        <button style={{ backgroundColor: "#68cb70" }} onClick={handleClick}  id="green"></button>
        <button style={{ backgroundColor: "#0a77c5" }} onClick={handleClick}  id="blue"></button>
      </div>
      <CreateArea bgcolor={theme.dark} onAdd={addNote} />
      <div>
        {notes.map((noteItem) => {
          return (
            <Note
              title={noteItem.title}
              content={noteItem.content}
              key={noteItem._id}
              id={noteItem._id}
              onDelete={deleteNote}
              bgcolor={theme.dark}


            />
          );
        })}
      </div>
      <Footer bgcolor={theme.light} />

</div>
  )
}

export default App;
