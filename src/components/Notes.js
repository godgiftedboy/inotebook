import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';
const Notes = (props) => {
  const {showAlert} = props;
  const noteContext = useContext(NoteContext);
  const { notes, getNote,editNote } = noteContext;
  const [note, setNote] = useState({id: "", etitle:"",edescription:"",etag:""})
  const navigate= useNavigate();
  
  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title ,edescription:currentNote.description,etag:currentNote.tag})

  }
  useEffect(()=>{
    if(localStorage.getItem('token')){

      getNote();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])
  const ref = useRef(null)
  const refClose= useRef(null)

  const handleClick=(e)=>{
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    showAlert("Updated Successfully", "success")
    
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})

}
  return (
    <>  

      <AddNote showAlert={showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note  </h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    placeholder="Enter title of your Note"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    placeholder="Enter description"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    placeholder="Enter tag"
                    onChange={onChange}
                  />
                </div>
              
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refClose} data-bs-dismiss="modal" onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
