import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import customerService from '../../../BackendServices/customer.service';

const Customerlist = () => {
    const [customer, setCustomer] = useState([]);
    const { id } = useParams();
    const init = () => {
        customerService.getAll()
            .then(response => {
                setCustomer(response.data);
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
        customerService.deleteCustomer(id)
            .then(response => {
                alert("Customer Deleted successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>List of Customers</h3>
            <hr />
            <div>
                <Link to="/add" className="btn btn-primary mb-2">Add Customer</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>remoteCustomerId</th>
                            <th>PersonDetails</th>
                            <th>Addresses</th>
                            <th>Employees</th>
                            <th>Projects</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customer.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.remoteCustomerId}</td>
                                    <td>

                                        <p> <Link to={`/customer/person/get/${customer.id}`}>Personal Details</Link></p>

                                    </td>
                                    <td>
                                        <p> <Link to={`/customer/${customer.id}/address`}>Add Address</Link></p>
                                    </td>
                                    <td>
                                        <p> <Link to={`/customer/${customer.id}/employee`}>Add Employee</Link></p>
                                    </td>
                                    <td>
                                        <p> <Link to={`/customer/${customer.id}/project`}>Add Project</Link></p>
                                    </td>
                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/customer/update/${customer.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(customer.id);
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

export default Customerlist;
