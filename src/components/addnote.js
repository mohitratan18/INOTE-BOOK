import React, { useState } from "react";
import { useContext } from "react";
import notecontext from "../context/notes/notesContext";
const Addnote = () => {
  const context = useContext(notecontext);
  const {addnote} = context;
  const [notes,setnotes] = useState({title:"",desc:""})
  const handleclick = (e)=>{
    e.preventDefault()
    addnote(notes.title,notes.desc);
  }
  const onchange = (e)=>{
    setnotes({...notes,[e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3 ">
      <h1>ADD A NOTE</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your notes with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="desc"
            onChange={onchange}

          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={onchange}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
