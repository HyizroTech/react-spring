import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from '../../BackendServices/userRock.service';

const UpdateUser = () => {
    const [userRock, setUserRock] = useState({
        isGroup: Boolean,
        isUser: Boolean,
        userName: "",
        employee:
        {
            active: Boolean,
            external: Boolean,
            hrId: "",
            intern: Boolean,
            remoteId: Number,
        }
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        UserService.get(id).then(response => {
            setUserRock(response.data);
        })
    };

    const addUserRock = (e) => {
        let data = { ...userRock };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'isGroup' || fname == 'isUser') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = { ...data, [fname]: val };

        setUserRock(data);
    };
    const handleEmployee = (e) => {
        let data = { ...userRock };
        let fname = e.target.name;
        let val = e.target.value;

        if (fname == 'active' || fname == 'external' || fname == 'intern') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = {
            ...data,
            employee: {
                ...data.employee,
                [fname]: val
            }
        };

        setUserRock(data);
    };


    const updateDataToServer = (data) => {
        UserService.update(id, data).then(
            (response) => {
                alert("User Updated Successfully");
                navigate("/userRockList");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(userRock);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update User!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="UserName"
                                        name="userName"
                                        value={userRock.userName}
                                        onChange={addUserRock}
                                    />
                                </div>

                                <label><strong>IsGroup?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="isGroup"
                                                value="true"
                                                checked={userRock.isGroup === true}
                                                onChange={addUserRock}
                                            />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="isGroup"
                                                value="false"
                                                checked={userRock.isGroup === false}
                                                onChange={addUserRock} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>IsUser?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="isUser"
                                                value="true"
                                                checked={userRock.isUser === true}
                                                onChange={addUserRock} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="isUser"
                                                value="false"
                                                checked={userRock.isUser === false}
                                                onChange={addUserRock} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <div>
                                    <br></br>
                                    <h3>Employee</h3>
                                </div>

                                <label><strong>IsActive?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="active"
                                                value="true"
                                                checked={userRock.employee.active === true}
                                                onChange={(e) => handleEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="active"
                                                value="false"
                                                checked={userRock.employee.active === false}
                                                onChange={(e) => handleEmployee(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>IsExternal?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="external"
                                                value="true"
                                                checked={userRock.employee.external === true}
                                                onChange={(e) => handleEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="external"
                                                value="false"
                                                checked={userRock.employee.external === false}
                                                onChange={(e) => handleEmployee(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>

                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="HrId"
                                        name="hrId"
                                        defaultValue={userRock.employee.hrId}
                                        onChange={(e) => handleEmployee(e)}
                                    />
                                </div>
                                <label><strong>IsIntern?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="intern"
                                                value="true"
                                                checked={userRock.employee.intern === true}
                                                onChange={(e) => handleEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="intern"
                                                value="false"
                                                checked={userRock.employee.intern === false}
                                                onChange={(e) => handleEmployee(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="RemoteId"
                                        name="remoteId"
                                        defaultValue={userRock.employee.remoteId}
                                        onInput={(e) => handleEmployee(e)}
                                    />
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update User</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UpdateUser;


