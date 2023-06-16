import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupService from '../../../BackendServices/group.service';
const UpdateGroup = () => {
    const [group, setGroup] = useState({
        groups: Boolean,
        name: "",
        user: Boolean,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        GroupService.get(id).then(response => {
            setGroup(response.data);
        })
    };


    const addData = (e) => {
        let data = { ...group };
        let fname = e.target.name;
        let val = e.target.value;

        if (fname == 'groups' || fname == 'user') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = { ...data, [fname]: val };
        setGroup(data)
    };

    const updateDataToServer = (data) => {
        GroupService.update(id, data).then(
            (response) => {
                alert("Group Updated Successfully");
                navigate("/groupList");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(group);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Group!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Here" value={group.name} onChange={(e) => addData(e)} />
                                </div>

                                <div className="form-group">
                                    <label><strong>IsGroup?</strong>
                                        <div className="form-group">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="groups"
                                                    value="true"
                                                    checked={group.groups === true}
                                                    onChange={addData} />
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <input

                                                    type="checkbox"
                                                    name="groups"
                                                    value="false"
                                                    checked={group.groups === false}
                                                    onChange={addData} />
                                                No
                                            </label>
                                        </div>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label><strong>IsUser?</strong>
                                        <div className="form-group">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="user"
                                                    value="true"
                                                    checked={group.user === true}
                                                    onChange={addData} />
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <input

                                                    type="checkbox"
                                                    name="user"
                                                    value="false"
                                                    checked={group.user === false}
                                                    onChange={addData} />
                                                No
                                            </label>
                                        </div>
                                    </label>
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Group</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateGroup
