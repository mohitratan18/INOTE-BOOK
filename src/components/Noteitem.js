import React from "react";
import { useContext  , useEffect} from "react";
import notecontext from "../context/notes/notesContext";
const Noteitem = (props) => {
  const { Notes} = props;
  const context = useContext(notecontext);
  const {deletenote} = context;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{Notes.title}</h5>
          <p className="card-text">{Notes.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{
            deletenote(Notes._id);
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
