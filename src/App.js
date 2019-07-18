import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";

// components
import Editor from "./editor";
import Sidebar from "./sidebar";
import SidebarItem from "./sidebaritem";

function App() {

  const [
        selectedNoteIndex, 
        setSlectedNoteIndex] = useState(null);

  const [
        selectedNote, setSlectedNote
        ] = useState(null);

  const [Notes, setNotes] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(snapshot => {
        const notes = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, []);

  // select note
  const selectNote = (note, index) => {
    // set selected note
    setSlectedNote(note);

    // set selected index
    setSlectedNoteIndex(index);
  };

  // delete note
  const deleteNote = (note) => {
    // retur note index
    const noteIndex = Notes.indexOf(note);

    if(selectedNoteIndex === noteIndex){
      // reset selected note
      setSlectedNote(null);
      setSlectedNoteIndex(null);
    } else {
      Notes.length > 1
      ?
      selectNote(Notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
      : 
      // reset selected note
      setSlectedNote(null);
      setSlectedNoteIndex(null);
    }

    // delete note from database
    firebase.firestore().collection('notes').doc(note.id).delete();

  };

  // new note
  const newNote = async (title) => {
     const note = {
       title,
       body: ''
     };

     const newNoteFromDB = await firebase
     .firestore().collection('notes').add({
       title: note.title,
       body: note.body,
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });

     const newId = newNoteFromDB.id;

     await setNotes([...Notes, note]);

     const newNoteIndex = Notes.indexOf(Notes.filter(note => note.id === newId)[0]);

     setSlectedNote(Notes[newNoteIndex]);

     setSlectedNoteIndex(newNoteIndex);

  };

  // note update
  const noteUpdate = (id, noteObj) => {
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  };

  return (
    <>
      <Sidebar
        notes={Notes}
        selectedNotesIndex={selectedNoteIndex}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
      />

      {
        selectedNote ? 
        <Editor 
          selectedNote={selectedNote}
          notes={Notes}
          noteUpdate={noteUpdate}
      /> : null
      }
    </>
  );
}

export default App;
