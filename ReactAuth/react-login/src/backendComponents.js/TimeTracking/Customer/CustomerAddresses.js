import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import customerService from '../../../BackendServices/customer.service';

const AddressList = () => {
    const [customer, setCustomer] = useState(
        {
            addresses: [{
                city: "",
                email: "",
                fax: "",
                houseNo: "",
                mobile: "",
                phone: "",
                street: "",
                zip: "",

            }],
        }
    );
    const { id } = useParams();

    const init = () => {
        customerService.get(id)
            .then(response => {
                console.log('printing Addresses', response.data);
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
            <h3>Addresses</h3>
            <hr />
            <div>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>City</th>
                            <th>Email</th>
                            <th>Fax</th>
                            <th>HouseNo</th>
                            <th>Mobile</th>
                            <th>Phone</th>
                            <th>Street</th>
                            <th>Zip</th>

                        </tr>
                    </thead>
                    <tbody>
                        {customer.addresses.map((address, index) => (

                            <tr key={index}>
                                <td>{address.city}</td>
                                <td>{address.email}</td>
                                <td>{address.fax}</td>
                                <td>{address.houseNo}</td>
                                <td>{address.mobile}</td>
                                <td>{address.phone}</td>
                                <td>{address.street}</td>
                                <td>{address.zip}</td>
                            </tr>
                        ))}



                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default AddressList;