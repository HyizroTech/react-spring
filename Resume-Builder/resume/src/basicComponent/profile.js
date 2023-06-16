import React from 'react';
import AuthService from '../AuthServices/auth.service';
import { Link } from "react-router-dom";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>

            <p> <Link to={`/userprofile/${currentUser.id}`}>Add Data to Generate</Link></p>

            <p> <Link to={`/userprofile/update/${currentUser.id}`}>Update your Data</Link></p>


        </div>

    );
};
export default Profile;