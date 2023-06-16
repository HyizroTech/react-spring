import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../../../BackendServices/employee.service";

const BookingEntryEmployee = () => {
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
    const navigate = useNavigate();
    const { id } = useParams();
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
    const submit = e => {
        e.preventDefault();
        EmployeeService.createBookingEntryEmployee(id, employee)
        navigate(`/bookingEntry/${id}/employees`);

    };
    return (
        <div>
            <div>
                <p>
                    <strong>Add Employee</strong>
                </p>
            </div>
            <form action="">
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
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={employee.firstName}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={employee.lastName}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="CompanyName"
                        name="companyName"
                        value={employee.companyName}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <label><strong>DateOfBirth</strong></label>
                    <input style={{ width: "300px" }}
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={employee.dateOfBirth}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>

                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={employee.email}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="FacebookReference"
                        name="facebookReference"
                        value={employee.facebookReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="GithubReference"
                        name="githubReference"
                        value={employee.githubReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="HomePage"
                        name="homePage"
                        value={employee.homePage}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="InstagramReference"
                        name="instagramReference"
                        value={employee.instagramReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="LinkedinReference"
                        name="linkedinReference"
                        value={employee.linkedinReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="StackOverFlowReference"
                        name="stackOverFlowReference"
                        value={employee.stackOverFlowReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        value={employee.title}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="TwitterReference"
                        name="twitterReference"
                        value={employee.twitterReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="XingReference"
                        name="xingReference"
                        value={employee.xingReference}
                        onInput={(e) => addEmployee(e)}
                    />
                </div>
            </form>
            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );

}
export default BookingEntryEmployee;