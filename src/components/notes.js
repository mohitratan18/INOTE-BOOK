import React from "react";
import { useContext , useEffect } from "react";
import notecontext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";
import Addnote from './addnote'
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(notecontext);
  const { Notes , getNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    
  }, [])
  
  return (
    <>
      <Addnote />
      <h3>YOUR NOTES</h3>
      <div className="row">
        {Notes.map((Notes) => {
          return <Noteitem key={Notes._id} Notes={Notes} />;
        })}
      </div>
    </>
  );
};

export default Notes;
