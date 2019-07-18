import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { sidebarStyles } from "../components/ui/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItems from "../sidebaritem";
import CircularProgress from "@material-ui/core/CircularProgress";

function Sidebar({
  classes,
  notes,
  selectedNotesIndex,
  selectNote,
  deleteNote,
  newNote
}) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");

  // add note
  const addNote = () => {
    // show input text to user
    setAddingNote(!addingNote);

    // reset the title
    setTitle("");
  };

  // update title
  const updateTitle = text => {
    setTitle(text);
  };

  // Submit new note
  const _newNote = () => {
    newNote(title);

    // reset input
    setTitle("");
    setAddingNote(false);
  };

  // select note
  const _selectNote = (note, index) => selectNote(note, index);

  return (
    <div className={classes.sidebarContainer}>
      <Button onClick={addNote} className={classes.newNoteBtn}>
        {addingNote ? "Cancel" : "New Note"}
      </Button>

      {addingNote ? (
        <div>
          <input
            className={classes.newNoteInput}
            type="text"
            value={title}
            placeholder="Enter new note title"
            onChange={e => updateTitle(e.target.value)}
          />
          <Button className={classes.newNoteSubmitBtn} onClick={_newNote}>
            Submit Note
          </Button>
        </div>
      ) : null}

      <List>
        {notes.length === 0 ? (
          <h4>Add note! </h4>
        ) : notes ? (
          notes.map((note, i) => (
            <div key={i}>
              <SidebarItems
                note={note}
                index={i}
                selectedNotesIndex={selectedNotesIndex}
                selectNote={selectNote}
                deleteNote={deleteNote}
              />

              <Divider />
            </div>
          ))
        ) : (
          <CircularProgress color="secondary" />
        )}
      </List>
    </div>
  );
}

export default withStyles(sidebarStyles)(Sidebar);
