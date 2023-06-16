import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupService from '../../../BackendServices/group.service';
const GroupList = () => {
    const [group, setGroup] = useState([]);
    const { id } = useParams();
    const init = () => {
        GroupService.getAll()
            .then(response => {
                setGroup(response.data);
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
        GroupService.deleteGroup(id)
            .then(response => {
                alert("Group deleted Successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>Group List</h3>
            <hr />
            <div>
                <Link to="/group" className="btn btn-primary mb-2">Add Group</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Groups</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            group.map(group => (
                                <tr key={group.id}>
                                    <td>{group.name}</td>
                                    <td>{group.groups.toString()}</td>
                                    <td>{group.user.toString()}</td>

                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/update-group/${group.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(group.id);
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

export default GroupList;

