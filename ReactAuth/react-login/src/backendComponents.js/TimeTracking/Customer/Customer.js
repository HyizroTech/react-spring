import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../../../BackendServices/customer.service";
const Customer = () => {

    const [customer, setCustomer] = useState({
        name: "",
        remoteCustomerId: "",
        person: {
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
            photo: "",
        },
    });

    const navigate = useNavigate();

    const addCustomer = (e) => {
        let data = { ...customer };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setCustomer(data);
    };
    const handlePerson = (e) => {
        let data = { ...customer };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            person: {
                ...data.person,
                [fname]: val
            }
        };
        setCustomer(data);
    };

    const submit = e => {
        e.preventDefault();
        customerService.create(customer);
        navigate("/customerList");
    };


    return (
        <div>
            <div>
                <p>
                    <strong>Add Customer</strong>
                </p>
            </div>
            <form action="">


                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={customer.name}
                        onChange={addCustomer}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="remoteCustomerId"
                        value={customer.remoteCustomerId}
                        name="remoteCustomerId"
                        onChange={addCustomer}
                    />
                </div>
                <div>
                    <p>
                        <strong>Add Person</strong>
                    </p>
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={customer.person.firstName}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={customer.person.lastName}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="CompanyName"
                        name="companyName"
                        value={customer.person.companyName}
                        onChange={handlePerson}
                    />
                </div>
                <label>DateOfBirth</label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="date"
                        placeholder="DateOfBirth"
                        name="dateOfBirth"
                        defaultValue={customer.person.dateOfBirth}
                        onChange={(e) => handlePerson(e)}
                    />
                </div>

                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={customer.person.email}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="FacebookReference"
                        name="facebookReference"
                        value={customer.person.facebookReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="GithubReference"
                        name="githubReference"
                        value={customer.person.githubReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="HomePage"
                        name="homePage"
                        value={customer.person.homePage}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="InstagramReference"
                        name="instagramReference"
                        value={customer.person.instagramReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="LinkedinReference"
                        name="linkedinReference"
                        value={customer.person.linkedinReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="StackOverFlowReference"
                        name="stackOverFlowReference"
                        value={customer.person.stackOverFlowReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        value={customer.person.title}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="TwitterReference"
                        name="twitterReference"
                        value={customer.person.twitterReference}
                        onChange={handlePerson}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="XingReference"
                        name="xingReference"
                        value={customer.person.xingReference}
                        onChange={handlePerson}
                    />
                </div>
            </form >


            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={submit}>
                    Submit
                </button>
            </div>

        </div >
    );
}

export default Customer;