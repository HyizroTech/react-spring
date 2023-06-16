import React, { useState, useEffect } from 'react';
import EventBus from "../common/EventBus";
import userProfileService from '../backendServices/userProfile.service';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import UserService from '../AuthServices/user.service';
import AuthService from '../AuthServices/auth.service';


const Users = () => {
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const init = () => {
        userProfileService.getUsers().then(
            (response) => {
                setUsers(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setUsers(_content);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }

        );
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        if (currentUser.id == id) {
            alert("This is Your account!!!");
        }
        else {
            UserService.deleteAccount(id)
                .then(response => {
                    alert("Account deleted successfully");
                    init();
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    };


    return (
        <div className="container">
            <h3>User's</h3>
            <hr color='black' />
            <div>
                <Table striped bordered hover responsive>
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Education</th>
                            <th>YearOfBirth</th>
                            <th>Nationality</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.education}</td>
                                    <td>{user.yearOfBirth}</td>
                                    <td>{user.nationality}</td>

                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/userprofile/update/${user.id}`} className="btn btn-outline-dark">Edit</Link>
                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(user.id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>

    );

};
export default Users;