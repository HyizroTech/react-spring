import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../../../BackendServices/employee.service';

const UpdateEmployee = () => {
    const [employee, setEmployee] = useState({
        active: Boolean,
        external: Boolean,
        hrId: "",
        intern: Boolean,
        remoteId: Number,
        firstName: "",
        lastName: "",
        companyName: "",
        dateOfBirth: Date,
        email: "",
        facebookReference: "",
        githubReference: "",
        homePage: "",
        instagramReference: "",
        linkedinReference: "",
        stackOverFlowReference: "",
        title: "",
        twitterReference: "",
        xingReference: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        EmployeeService.get(id).then(response => {
            setEmployee(response.data);
        })
    };

    const addEmployee = (e) => {
        let data = { ...employee };
        let fname = e.target.name;
        let val = e.target.value;

        if (fname == 'active' || fname == 'external' || fname == 'intern') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = { ...data, [fname]: val };
        setEmployee(data);
    };

    const updateDataToServer = (data) => {
        EmployeeService.updateEmployee(id, data).then(
            (response) => {
                alert("Employee Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(employee);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Employee!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <label><strong>IsActive?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="active"
                                                value="true"
                                                checked={employee.active === true}
                                                onChange={(e) => addEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="active"
                                                value="false"
                                                checked={employee.active === false}
                                                onChange={(e) => addEmployee(e)} />
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
                                                checked={employee.external === true}
                                                onChange={(e) => addEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="external"
                                                value="false"
                                                checked={employee.external === false}
                                                onChange={(e) => addEmployee(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>

                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="HrId"
                                        name="hrId"
                                        defaultValue={employee.hrId}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <label><strong>IsIntern?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="intern"
                                                value="true"
                                                checked={employee.intern === true}
                                                onChange={(e) => addEmployee(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="intern"
                                                value="false"
                                                checked={employee.intern === false}
                                                onChange={(e) => addEmployee(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <div className="form-group">
                                    <label>RemoteId?</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="RemoteId"
                                        name="remoteId"
                                        defaultValue={employee.remoteId}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >FirstName</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="firstName"
                                        name="firstName"
                                        value={employee.firstName}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >lastName</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="lastName"
                                        name="lastName"
                                        value={employee.lastName}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >CompanyName</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="CompanyName"
                                        name="companyName"
                                        value={employee.companyName}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>DateOfBirth</label>
                                    <input style={{ width: "300px" }}
                                        type="date"
                                        className="form-control"
                                        name="dateOfBirth"
                                        value={employee.dateOfBirth}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <label >Email</label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={employee.email}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >FacebookReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="FacebookReference"
                                        name="facebookReference"
                                        value={employee.facebookReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >GithubReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="GithubReference"
                                        name="githubReference"
                                        value={employee.githubReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <label >HomePage</label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="HomePage"
                                        name="homePage"
                                        value={employee.homePage}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >InstagramReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="InstagramReference"
                                        name="instagramReference"
                                        value={employee.instagramReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >LinkedinReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="LinkedinReference"
                                        name="linkedinReference"
                                        value={employee.linkedinReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >StackOverFlowReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="StackOverFlowReference"
                                        name="stackOverFlowReference"
                                        value={employee.stackOverFlowReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >Title</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                        name="title"
                                        value={employee.title}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >TwitterReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="TwitterReference"
                                        name="twitterReference"
                                        value={employee.twitterReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label >XingReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="XingReference"
                                        name="xingReference"
                                        value={employee.xingReference}
                                        onChange={(e) => addEmployee(e)}
                                    />
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Employee</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )

}
export default UpdateEmployee;