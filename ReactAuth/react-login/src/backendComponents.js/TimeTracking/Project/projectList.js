import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import projectService from '../../../BackendServices/project.service';
const ProjectList = () => {
    const [project, setproject] = useState([]);
    const { id } = useParams();
    const init = () => {
        projectService.getAllProjects(id)
            .then(response => {
                setproject(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }


    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        projectService.deleteProject(id)
            .then(response => {
                alert("Project deleted Successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>List of Projects</h3>
            <hr />
            <div>
                <Link to={`/customer/${id}/project`} className="btn btn-primary mb-2">Add Project</Link>
                <table className="table table-bordered table-hover table-striped table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>Active</th>
                            <th>Billable</th>
                            <th>Budget</th>
                            <th>ContractId</th>
                            <th>Currency</th>
                            <th>Discount</th>
                            <th>EndDate</th>
                            <th>Finished</th>
                            <th>FixedPrice</th>
                            <th>Name</th>
                            <th>RecruiterId</th>
                            <th>RemoteContractId</th>
                            <th>RemoteId</th>
                            <th>StartDate</th>
                            <th>TimeBudget</th>
                            <th>ProjectRates</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            project.map(project => (
                                <tr key={project.id}>
                                    <td>{project.active.toString()}</td>
                                    <td>{project.billable.toString()}</td>
                                    <td>{project.budget}</td>
                                    <td>{project.contractId}</td>
                                    <td>{project.currency}</td>
                                    <td>{project.discount}</td>
                                    <td>{project.endDate}</td>
                                    <td>{project.finished.toString()}</td>
                                    <td>{project.fixedPrice.toString()}</td>
                                    <td>{project.name}</td>
                                    <td>{project.recruiterId}</td>
                                    <td>{project.remoteContractId}</td>
                                    <td>{project.remoteId}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.timeBudget}</td>


                                    <td>
                                        <p> <Link to={`/project/${project.id}/rates`}> Rates</Link></p>

                                    </td>
                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link className="btn btn-outline-dark" to={`/project/update/${project.id}`}>Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(project.id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ProjectList;