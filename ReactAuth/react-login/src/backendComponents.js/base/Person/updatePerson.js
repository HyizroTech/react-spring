import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonService from '../../../BackendServices/person.service';

const UpdatePerson = () => {
    const [person, setPerson] = useState({
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
        photo: File,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        PersonService.get(id).then(response => {
            setPerson(response.data);
        })
    };

    const addPerson = (e) => {
        let data = { ...person };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setPerson(data);
    };

    const updateDataToServer = (data) => {
        PersonService.update(id, data).then(
            (response) => {
                alert("Person Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(person);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Person!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >FirstName</label>
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
                                    <label >lastName</label>
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
                                    <label >CompanyName</label>
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
                                    <label>DateOfBirth</label>
                                    <input style={{ width: "300px" }}
                                        type="date"
                                        className="form-control"
                                        name="dateOfBirth"
                                        value={person.dateOfBirth}
                                        onChange={addPerson}
                                    />
                                </div>
                                <label >Email</label>
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
                                    <label >FacebookReference</label>
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
                                    <label >GithubReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="GithubReference"
                                        name="githubReference"
                                        value={person.githubReference}
                                        onChange={addPerson}
                                    />
                                </div>
                                <label >HomePage</label>
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
                                    <label >InstagramReference</label>
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
                                    <label >LinkedinReference</label>
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
                                    <label >StackOverFlowReference</label>
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
                                    <label >Title</label>
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
                                    <label >TwitterReference</label>
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
                                    <label >XingReference</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        className="form-control"
                                        placeholder="XingReference"
                                        name="xingReference"
                                        value={person.xingReference}
                                        onChange={addPerson}
                                    />
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Person</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UpdatePerson;