import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonService from "../../../BackendServices/person.service"
const Person = () => {
    const [person, setPerson] = useState(
        {
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
    const addPerson = (e) => {
        let data = { ...person };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setPerson(data);
    };


    const submit = e => {
        e.preventDefault();
        PersonService.create(person);
        navigate("/personList");
    };
    return (
        <div>
            <div>
                <p>
                    <strong>Add Person</strong>
                </p>
            </div>
            <form action="">
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={person.firstName}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={person.lastName}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="CompanyName"
                        name="companyName"
                        value={person.companyName}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <label><strong>DateOfBirth</strong></label>
                    <input style={{ width: "300px" }}
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={person.dateOfBirth}
                        onChange={addPerson}
                    />
                </div>

                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={person.email}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="FacebookReference"
                        name="facebookReference"
                        value={person.facebookReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="GithubReference"
                        name="githubReference"
                        value={person.githubReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="HomePage"
                        name="homePage"
                        value={person.homePage}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="InstagramReference"
                        name="instagramReference"
                        value={person.instagramReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="LinkedinReference"
                        name="linkedinReference"
                        value={person.linkedinReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="StackOverFlowReference"
                        name="stackOverFlowReference"
                        value={person.stackOverFlowReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        value={person.title}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="TwitterReference"
                        name="twitterReference"
                        value={person.twitterReference}
                        onChange={addPerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="XingReference"
                        name="xingReference"
                        value={person.xingReference}
                        onChange={addPerson}
                    />
                </div>

            </form>
            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={submit} >
                    Submit
                </button>
            </div>
        </div>
    );

}
export default Person;