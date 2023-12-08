

import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const noteInitial=[];
    const [notes, setNotes] = useState(noteInitial)

    //get all Notes
    const getNote=async ()=>{
      //TODO : API call to fetch all notes
      const url=`${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: "GET", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },   
      });
      const json=  await response.json(); 
      console.log(json);
      setNotes(json)

    }
    //Adding a Note
    const addNote=async (title,description,tag)=>{
      //TODO : API call to fetch the notes
      const url=`${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: "POST", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },   
        body: JSON.stringify({title,description,tag}),
      });
     const note = await response.json(); 
      setNotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote=async (id)=>{

      //APICALL 
      const url=`${host}/api/notes/deletenote/${id}`
      const response = await fetch(url, {
        method: "DELETE", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },   
      });
      const json=  response.json(); 
      console.log(json);


      //Logic to delete note
      const newNotes=notes.filter((note)=>{
        return note._id!==id
      })
      setNotes(newNotes)
    }

    //Update Note
    const  editNote=async (id,title,description,tag)=>{

      //TODO  : API CALL
      const url=`${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: "PUT", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },   
        body: JSON.stringify({title,description,tag}),
      });
      const json=  response.json(); 
      console.log(json)
    

      //Logic to update:
      let newNotes= JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}

        </NoteContext.Provider>
    )
}
export default NoteState