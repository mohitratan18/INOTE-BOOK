import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
    const [Credentials, setCredentials] = useState({
    email:"",
    password:""
})
    const handlesubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Credentials.email, password : Credentials.password }),
          });
          const json = await response.json()
          console.log(json);
          if(json.status === true){
            // redirection
            // eslint-disable-next-line
            localStorage.setItem('auth-token',json.webtoken);
            navigate("/");

          }
          else
          {
            alert("invalid credentials")
          }
    }
    const onchange = (e)=>{
        setCredentials({...Credentials,[e.target.name]:e.target.value})
      }
  return (
    <div className="my-3"> 
      <form className="container" onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={onchange}
            value={Credentials.email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={onchange}
            value={Credentials.password}
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
