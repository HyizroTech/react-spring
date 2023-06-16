import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../BackendServices/userRock.service";
const UserRock = () => {
    const [userRock, setUserRock] = useState(
        {
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
            }

        });
    const navigate = useNavigate();

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
    const submit = e => {
        e.preventDefault();
        UserService.create(userRock);
        navigate("/userRockList");
        console.log(userRock);
    };
    return (
        <div>
            <div>
                <p>
                    <strong>Add UserRockware</strong>
                </p>
            </div>
            <form action="">
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
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={userRock.employee.firstName}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={userRock.employee.lastName}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="CompanyName"
                        name="companyName"
                        value={userRock.employee.companyName}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <label><strong>DateOfBirth</strong></label>
                    <input style={{ width: "300px" }}
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={userRock.employee.dateOfBirth}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>

                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={userRock.employee.email}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="FacebookReference"
                        name="facebookReference"
                        value={userRock.employee.facebookReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="GithubReference"
                        name="githubReference"
                        value={userRock.employee.githubReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="HomePage"
                        name="homePage"
                        value={userRock.employee.homePage}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="InstagramReference"
                        name="instagramReference"
                        value={userRock.employee.instagramReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="LinkedinReference"
                        name="linkedinReference"
                        value={userRock.employee.linkedinReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="StackOverFlowReference"
                        name="stackOverFlowReference"
                        value={userRock.employee.stackOverFlowReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        value={userRock.employee.title}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="TwitterReference"
                        name="twitterReference"
                        value={userRock.employee.twitterReference}
                        onInput={(e) => handleEmployee(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="XingReference"
                        name="xingReference"
                        value={userRock.employee.xingReference}
                        onInput={(e) => handleEmployee(e)}
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
export default UserRock;
