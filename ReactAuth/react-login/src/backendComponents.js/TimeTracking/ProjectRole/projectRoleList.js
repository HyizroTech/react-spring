import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projectRoleService from '../../../BackendServices/projectRole.service';

const ProjectRoleList = () => {
    const [projectRole, setProjectRole] = useState([]);
    const { id } = useParams();

    const init = () => {
        projectRoleService.get(id)
            .then(response => {
                setProjectRole(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);



    return (
        <div className="container">
            <h3>Project_Role Details</h3>
            <hr />
            <div>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>RemoteId</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            <tr key={projectRole.id}>
                                <td>{projectRole.remoteId}</td>
                                <td>{projectRole.name}</td>
                                <td>{projectRole.description}</td>
                                <td style={{ 'whiteSpace': 'nowrap' }}>
                                    <Link to={`/projectRole/update/${projectRole.id}`} className="btn btn-outline-dark">Edit</Link>

                                </td>
                            </tr>

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProjectRoleList;