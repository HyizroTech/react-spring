import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectSevice from '../../../BackendServices/project.service';
const UpdateProject = () => {
    const [project, setProject] = useState({
        active: Boolean,
        billable: Boolean,
        budget: Number,
        contractId: "",
        currency: "",
        discount: Number,
        endDate: Date,
        finished: Boolean,
        fixedPrice: Boolean,
        name: "",
        recruiterId: "",
        remoteContractId: "",
        remoteId: Number,
        startDate: Date,
        timeBudget: Number,
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        ProjectSevice.get(id).then(response => {
            setProject(response.data);
        })
    };

    const addProject = (e) => {
        let data = { ...project };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'active' || fname == 'billable' || fname == 'finished' || fname == 'fixedPrice') {
            val = e.target.value === 'true' ? true : false;
        }
        else {
            val = e.target.value;
        }
        data = { ...data, [fname]: val };
        setProject(data);
    };

    const updateDataToServer = (data) => {
        ProjectSevice.updateProject(id, data).then(
            (response) => {
                alert("Project Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(project);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Project!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <label><strong>IsActive?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="active"
                                                value="true"
                                                checked={project.active === true}
                                                onChange={(e) => addProject(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="active"
                                                value="false"
                                                checked={project.active === false}
                                                onChange={(e) => addProject(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>Billable?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="billable"
                                                value="true"
                                                checked={project.billable === true}
                                                onChange={(e) => addProject(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="billable"
                                                value="false"
                                                checked={project.billable === false}
                                                onChange={(e) => addProject(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <div className="form-group">
                                    <label>Budget</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="Budget"
                                        name="budget"
                                        defaultValue={project.budget}
                                        onInput={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ContractId</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="ContractId"
                                        name="contractId"
                                        defaultValue={project.contractId}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Currency</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Currency"
                                        name="currency"
                                        defaultValue={project.currency}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Discount</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="Discount"
                                        name="discount"
                                        defaultValue={project.discount}
                                        onInput={(e) => addProject(e)}
                                    />
                                </div>
                                <label><strong>EndDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="date"
                                        placeholder="EndDate"
                                        name="endDate"
                                        defaultValue={project.endDate}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <label><strong>IsFinished?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="finished"
                                                value="true"
                                                checked={project.finished === true}
                                                onChange={(e) => addProject(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="finished"
                                                value="false"
                                                checked={project.finished === false}
                                                onChange={(e) => addProject(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>IsFixedPrice?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fixedPrice"
                                                value="true"
                                                checked={project.fixedPrice === true}
                                                onChange={(e) => addProject(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="fixedPrice"
                                                value="false"
                                                checked={project.fixedPrice === false}
                                                onChange={(e) => addProject(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        defaultValue={project.name}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>RecruiterId</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="RecruiterId"
                                        name="recruiterId"
                                        defaultValue={project.recruiterId}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>RemoteContractId</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="RemoteContractId"
                                        name="remoteContractId"
                                        defaultValue={project.remoteContractId}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>RemoteId</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="RemoteId"
                                        name="remoteId"
                                        defaultValue={project.remoteId}
                                        onInput={(e) => addProject(e)}
                                    />
                                </div>
                                <label><strong>startDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="date"
                                        placeholder="StartDate"
                                        name="startDate"
                                        defaultValue={project.startDate}
                                        onChange={(e) => addProject(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>TimeBudget</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="TimeBudget"
                                        name="timeBudget"
                                        defaultValue={project.timeBudget}
                                        onInput={(e) => addProject(e)}
                                    />
                                </div>


                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Project</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateProject;
