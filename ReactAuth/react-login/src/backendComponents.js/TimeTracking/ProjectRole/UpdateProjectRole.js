import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectRoleService from '../../../BackendServices/projectRole.service';

const UpdateProjectRole = () => {
    const [projectRole, setProjectRole] = useState({
        name: "",
        remoteId: Number,
        description: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        projectRoleService.get(id).then(response => {
            setProjectRole(response.data);
        })
    };

    const addProjectRole = (e) => {
        let data = { ...projectRole };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setProjectRole(data);
    };

    const updateDataToServer = (data) => {
        projectRoleService.update(id, data).then(
            (response) => {
                alert("ProjectRole Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(projectRole);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update ProjectRole!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Here" value={projectRole.name} onChange={(e) => addProjectRole(e)} />
                                </div>
                                <div className="form-group">
                                    <label >Description</label>
                                    <input type="text" className="form-control" name="description" placeholder="Enter Here" value={projectRole.description} onChange={(e) => addProjectRole(e)} />
                                </div>
                                <div className="form-group">
                                    <label >RemoteId</label>
                                    <input
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="RemoteId"
                                        name="remoteId"
                                        value={projectRole.remoteId}
                                        onChange={(e) => addProjectRole(e)}
                                    />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update ProjectRole</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateProjectRole;