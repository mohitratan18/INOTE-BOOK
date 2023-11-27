import React, { useState } from "react";
import notecontext from "./notesContext";
import { json } from "react-router-dom";
const url = "http://localhost:5000";

const Notestate = (props) => {
  const notes = [];
  const [Notes, setNotes] = useState(notes);

  // fetching notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const jsonn = await response.json();
    console.log(jsonn);
    setNotes(jsonn);
  };

  // ADD NOTE
  const addnote = async (title, desc) => {
    const response = await fetch(`${url}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description: desc }),
    });
    const note = {
      _id: "651545ef3ea0f7e49976de0bc",
      user: "6512eabb9588700c8454aff5",
      title: title,
      description: desc,
      date: "2023-09-27T18:30:00.000Z",
      __v: 0,
    };
    setNotes(Notes.concat(note));
  };

  // DELETE NOTE
  const deletenote = async (id) => {
    const response = await fetch(`${url}/api/notes/delete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });

    const newnotes = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  // UPDATE NOTE
  const updatenote = (id, title, desc) => {
    for (let i = 0; i < Notes.length(); i++) {
      const element = Notes[i];
      if (element._id === id) {
        element.title = title;
        element.desc = desc;
      }
    }
  };

  return (
    <notecontext.Provider
      value={{ Notes, addnote, deletenote, updatenote, getNotes }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default Notestate;
