import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
    const noteContext = useContext(NoteContext);
    const {  addNote } = noteContext;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const {title,description,tag}=note;
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(title,description,tag);
        props.showAlert("Note Added Successfully","success")
        setNote({title:"",description:"",tag:""})


    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }

  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title of your Note"
              onChange={onChange}
              minLength={5} required
              value={note.title}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter description"
              onChange={onChange}
              minLength={5} required
              value={note.description}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
