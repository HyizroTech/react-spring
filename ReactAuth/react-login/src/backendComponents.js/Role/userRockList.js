import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from '../../BackendServices/userRock.service';
const UserList = () => {
    const [userRock, setUserRock] = useState([]);
    const { id } = useParams();
    const init = () => {
        UserService.getAll()
            .then(response => {
                setUserRock(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }


    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        UserService.deleteUser(id)
            .then(response => {
                alert("User deleted Successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>List of Users</h3>
            <hr />
            <div>
                <Link to="/addUserRock" className="btn btn-primary mb-2">Add User</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>UserName</th>
                            <th>IsGroup?</th>
                            <th>IsUser?</th>
                            <th>Employees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userRock.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.isGroup.toString()}</td>
                                    <td>{user.isUser.toString()}</td>
                                    <td>
                                        <p> <Link to={`/userRock/employees/get/${user.id}`}>Employees</Link></p>
                                    </td>
                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/user/update/${user.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(user.id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default UserList;
