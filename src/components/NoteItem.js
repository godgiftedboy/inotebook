import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const { title, description } = note;
  const noteContext = useContext(NoteContext);
  const {  deleteNote } = noteContext;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={() => {
            deleteNote(note._id)
            props.showAlert("Deleted Successfully", "success")
          }}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
            updateNote(note)
           
          }}></i>


        </div>
      </div>
    </div>
  );
};

export default NoteItem;
