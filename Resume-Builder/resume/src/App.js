import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from './AuthServices/auth.service';
import Login from './basicComponent/login';
import Register from './basicComponent/register';
import Home from "./basicComponent/home";
import Profile from './basicComponent/profile';
import BoardAdmin from './basicComponent/board-admin';
import EventBus from "./common/EventBus";
import UserProfile from "./backendComponents/userProfile";
import Users from './backendComponents/users_Data';
import Update from "./backendComponents/update_data";
const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showAllData, setShowAllData] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowAllData(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setShowAllData(false);
    setCurrentUser(undefined);
  };

  return (
    <div>

      <nav className="navbar navbar-expand  navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Rockware
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>


          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Header/Footer
              </Link>
            </li>
          )}

          {showAllData && (
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                All Users
              </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/userprofile/update/:id" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;