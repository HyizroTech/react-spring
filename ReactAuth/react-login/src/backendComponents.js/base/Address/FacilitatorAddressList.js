import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddressService from '../../../BackendServices/address.service';

const FacilitatorAddressList = () => {
    const [address, setAddress] = useState([]);
    const { id } = useParams();
    const init = () => {
        AddressService.getFacilitatorAddresses(id)
            .then(response => {

                setAddress(response.data);
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
        AddressService.deleteAddress(id)
            .then(response => {
                alert("Address deleted successfully");

                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    return (
        <div className="container">
            <h3>AddressList</h3>
            <hr />
            <div>
                <Link to={`/facilitator/${id}/address`} className="btn btn-primary mb-2">Add Address</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>city</th>
                            <th>email</th>
                            <th>fax</th>
                            <th>houseNo</th>
                            <th>mobile</th>
                            <th>phone</th>
                            <th>street</th>
                            <th>zip</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            address.map(address => (
                                <tr key={address.id}>
                                    <td>{address.city}</td>
                                    <td>{address.email}</td>
                                    <td>{address.fax}</td>
                                    <td>{address.houseNo}</td>
                                    <td>{address.mobile}</td>
                                    <td>{address.phone}</td>
                                    <td>{address.street}</td>
                                    <td>{address.zip}</td>
                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/address/${address.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(address.id);
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
export default FacilitatorAddressList;