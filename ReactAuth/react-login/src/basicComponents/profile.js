import React from 'react';
import AuthService from '../AuthServices/auth.service';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
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

            <div>
                <Card>
                    <Card.Header as="h5">Lists</Card.Header>
                    <Card.Body>
                        <ListGroup as="ul" >
                            <ListGroup.Item as="li" action hover>
                                <Link to={"/customerList"} >Customers List</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover>
                                <Link to={"/personList"} >Person List</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover >
                                <Link to={"/facilitatorList"} >Facilitators list</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover>
                                <Link to={"/userRockList"} >User list</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover >
                                <Link to={"/groupList"} >Group list</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover >
                                <Link to={"/Data"} >Data Config</Link>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" action hover >
                                <Link to={"/bookingEntryList"} >BookingEntry List</Link>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </div>

    );
};
export default Profile;