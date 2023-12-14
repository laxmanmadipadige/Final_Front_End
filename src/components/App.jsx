import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  //const [data, setData] = useState(null);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

// Fetch data from the Express.js backend when the component mounts
// useEffect(() => {
//   axios.get('http://localhost:5000/notes')  // Adjust the URL based on your Express.js server
//     .then(response => {
//       setData(response.data);
//       console.log('Data from the backend:', response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, [notes]);

useEffect(() => {
  axios.get('http://localhost:5000/notes')
    .then(response => {
      setNotes(response.data);
      console.log('Data from the backend:', response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [])

// Function to delete a note
const deleteNote = (titleToDelete) => {
  // Send a DELETE request to the backend to delete the note
  axios.delete(`http://localhost:5000/notes?title=${titleToDelete}`, { data: { title: titleToDelete } })
    .then(response => {
      console.log(response.data);
      // Remove the deleted note from the state
      setNotes(prevNotes => prevNotes.filter(note => note.title !== titleToDelete));
    })
    .catch(error => {
      console.error('Error deleting note:', error);
    });
};

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
<Note
  key={index}
  id={index}
  title={noteItem.title}
  content={noteItem.content}
  onDelete={deleteNote}
/>

        );
      })}
      <div className="sampleData">
        {/* {data ? (
          <p>Data from the backend: {data.name}</p>
        ) : (
          <p>No data available</p>
        )} */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
