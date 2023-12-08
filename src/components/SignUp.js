import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const host = "http://localhost:5000"
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createUser/`
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //redirect todo
      //save the auth token and redirect
      props.showAlert("Account Created Successfully", "success")
      localStorage.setItem('token', json.authToken)
      navigate("/");
    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }
  return (
    <>
      <div className="container my-3">
        <h2>Create an Account on iNoteBook</h2>
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" className="form-control" id="name" placeholder="Enter name" onChange={onChange} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input name="email" type="email" className="form-control" id="email" placeholder="Enter email" onChange={onChange} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" className="form-control" autoComplete="on" id="password" placeholder="Password" onChange={onChange} minLength={5} required />
          </div>
          <div className="form-group my-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input name="cpassword" type="password" className="form-control" autoComplete="on" id="cpassword" placeholder="Confirm password" onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default SignUp