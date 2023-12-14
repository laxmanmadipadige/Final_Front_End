import React, { useState } from "react";
import axios from 'axios';

function CreateArea(props) {
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

  function submitNote(event) {
    // Send a POST request to the backend to store the new note
    axios.post('http://localhost:5000/notes', note)
      .then(response => {
        console.log('Note added successfully:', response.data);
        props.onAdd(response.data); // Assuming the response contains the saved note
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });

    setNote({
      title: "",
      content: ""
    });

    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
