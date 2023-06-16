import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectService from '../../../BackendServices/project.service';
const ProjectCustomer = () => {
    const [project, setProject] = useState(
        {
            customers: [
                {
                    name: "",
                    remoteCustomerId: "",
                }
            ],
        }
    );
    const { id } = useParams();

    const init = () => {
        projectService.get(id)
            .then(response => {
                console.log('printing Customers', response.data);
                setProject(response.data);
            }).catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, []);
    return (
        <div className="container">
            <h3>Customers</h3>
            <hr />
            <div>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>RemoteCustomerId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.remoteCustomerId}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default ProjectCustomer;

