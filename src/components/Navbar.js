import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
  const host = "http://localhost:5000"
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userJoinDate, setJoinDate] = useState(null)

  //get user data
  const getUserDetail = async () => {
    //TODO : API call to fetch user data
    const url = `${host}/api/auth/getUser/`
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setUserName(json.name)
    setUserEmail(json.email)
    setJoinDate(json.date);

    // console.log(data);
    // setUserData(json);

  }




  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login");
    props.showAlert("Logged Out Successfully","success")

  }
  let location = useLocation();
  useEffect(() => {

    // console.log(location.pathname)
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link to="/login" className="btn btn-primary mx-1" role="button">Login</Link>
              <Link to="/signup" className="btn btn-primary mx-1" role="button">SignUp</Link>
            </form> :

              //TODO : API call to fetch user data
              <div className="mx-3">
                <button type="button" onClick={getUserDetail} className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#ModalForUser">
                  Get User Details
                </button>

                <div className="modal fade" id="ModalForUser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="card" >
                          <div className="card-body">
                            <h5 className="card-title">Username: {userName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Email: {userEmail}</h6>
                            <p className="card-text">Account Created On: {new Date(userJoinDate).toGMTString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleLogout} data-bs-dismiss="modal" className="btn btn-primary">Logout</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
              </div>
              //  <button onClick={handleLogout} className="btn btn-primary">Logout</button> 
            }


          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
