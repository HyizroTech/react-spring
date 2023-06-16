import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectService from '../../../BackendServices/project.service';

const BookingEntryProject = () => {
    const [project, setProject] = useState([]);
    const { id } = useParams();
    const init = () => {
        ProjectService.get(id)
            .then(response => {
                setProject(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }


    useEffect(() => {
        init();
    }, []);


    return (
        <div className="container">
            <h3>Project Details</h3>
            <hr />
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={project.id}>
                        <td>{String(project.active)}</td>
                        <td>{String(project.billable)}</td>
                        <td>{project.budget}</td>
                        <td>{project.contractId}</td>
                        <td>{project.currency}</td>
                        <td>{project.discount}</td>
                        <td>{project.endDate}</td>
                        <td>{String(project.finished)}</td>
                        <td>{String(project.fixedPrice)}</td>
                        <td>{project.name}</td>
                        <td>{project.recruiterId}</td>
                        <td>{project.remoteContractId}</td>
                        <td>{project.remoteId}</td>
                        <td>{project.startDate}</td>
                        <td>{project.timeBudget}</td>
                        <td style={{ 'whiteSpace': 'nowrap' }}>
                            <Link className="btn btn-outline-dark" to={`/project/update/${project.id}`}>Edit</Link>
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>

    );
}

export default BookingEntryProject;
