import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//nameisd@heaven.com
//scam2021
const Login = (props) => {
    const host = "http://localhost:5000"
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/api/auth/login`
        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //redirect todo
            //save the auth token and redirect
            props.showAlert("Login Successful", "success")
            localStorage.setItem('token', json.authToken)
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }


    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="container my-3">
                <h2>Login to iNoteBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="email">Email address</label>
                        <input onChange={onChange} name="email" type="email" className="form-control" id="email" value={credential.email} placeholder="Enter email" />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="password">Password</label>
                        <input onChange={onChange} name="password" type="password" className="form-control" value={credential.password} autoComplete="on" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login