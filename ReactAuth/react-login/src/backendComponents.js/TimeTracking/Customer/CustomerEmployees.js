import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customerService from '../../../BackendServices/customer.service';
const AddressList = () => {
    const [customer, setCustomer] = useState(
        {
            employees: [{
                active: Boolean,
                external: Boolean,
                hrId: "",
                intern: Boolean,
                remoteId: Number,

            }],
        }
    );
    const { id } = useParams();

    const init = () => {
        customerService.get(id)
            .then(response => {
                setCustomer(response.data);
            }).catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="container">
            <h3>Employees</h3>
            <hr />
            <div>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>active</th>
                            <th>external</th>
                            <th>hrId</th>
                            <th>intern</th>
                            <th>remoteId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.employees.map((employee, index) => (

                            <tr key={index}>
                                <td>{employee.active.toString()}</td>
                                <td>{employee.external.toString()}</td>
                                <td>{employee.hrId}</td>
                                <td>{employee.intern.toString()}</td>
                                <td>{employee.remoteId}</td>
                            </tr>
                        ))}



                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default AddressList;