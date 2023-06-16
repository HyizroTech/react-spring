import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeService from '../../../BackendServices/employee.service';

const RateEmployeeList = () => {
    const [employee, setEmployee] = useState([]);
    const { id } = useParams();
    const init = () => {
        EmployeeService.getRateEmployee(id)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        EmployeeService.deleteEmployee(id)
            .then(response => {
                alert("Employee deleted successfully");

                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    return (
        <div className="container">
            <h3>EmployeeList</h3>
            <hr />
            <div>
                <Link to={`/rate/${id}/employee`} className="btn btn-primary mb-2">Add Employee</Link>
                <table className="table table-bordered table-hover table-striped table-responsive ">
                    <thead className="thead-dark">
                        <tr>
                            <th>IsActive</th>
                            <th>IsExternal</th>
                            <th>HrId</th>
                            <th>IsIntern</th>
                            <th>RemoteId</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>companyName</th>
                            <th>dateOfBirth</th>
                            <th>email</th>
                            <th>facebookReference</th>
                            <th>githubReference</th>
                            <th>homePage</th>
                            <th>instagramReference</th>
                            <th>linkedinReference</th>
                            <th>stackOverFlowReference</th>
                            <th>title</th>
                            <th>twitterReference</th>
                            <th>xingReference</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.active.toString()}</td>
                                    <td>{employee.external.toString()}</td>
                                    <td>{employee.hrId}</td>
                                    <td>{employee.intern.toString()}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.companyName}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.facebookReference}</td>
                                    <td>{employee.githubReference}</td>
                                    <td>{employee.homePage}</td>
                                    <td>{employee.instagramReference}</td>
                                    <td>{employee.linkedinReference}</td>
                                    <td>{employee.stackOverFlowReference}</td>
                                    <td>{employee.title}</td>
                                    <td>{employee.twitterReference}</td>
                                    <td>{employee.xingReference}</td>


                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/employee/${employee.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(employee.id);
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
export default RateEmployeeList;