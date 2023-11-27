import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  let navigate = useNavigate();
  const [Credentials, setCredentials] = useState({
    name:"",
    email:"",
    password:"",
  })
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Credentials.name,
        email: Credentials.email,
        password: Credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.status===true){
      navigate("/login");
    }
    else{
      alert(json.message);
    }
  };
  const onchange = (e)=>{
    setCredentials({...Credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3">
      <form onSubmit={handlesubmit}>
        <div className="form-group ">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            name="name"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1 my-3">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onchange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1  my-3">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
