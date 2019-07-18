import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { sidebaritemStyles } from "../components/ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

function sidebarItem({
  note,
  index,
  selectedNotesIndex,
  selectNote,
  deleteNote,
  classes
}) {

  // select note
  const _selectNote = (note,index) => selectNote(note,index);

  // delete note from database and DOM
  const dNote = (note) => {
      if(window.confirm(`Are you sure want to delete: ${note.title}`)){
          deleteNote(note);
      }
  };

  return (
    <div key={index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNotesIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => _selectNote(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
          />
        </div>

        <DeleteIcon
          onClick={() => dNote(note)}
          className={classes.deleteIcon}
        />
      </ListItem>
    </div>
  );
}

export default withStyles(sidebaritemStyles)(sidebarItem);
