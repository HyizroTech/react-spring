import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import facilitatorService from '../../BackendServices/facilitator.service';
const FacilitatorList = () => {
    const [facilitator, setFacilitator] = useState([]);
    const { id } = useParams();
    const init = () => {
        facilitatorService.getAll()
            .then(response => {
                setFacilitator(response.data);
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
        facilitatorService.deleteFacilitator(id)
            .then(response => {
                alert("Facilitator deleted successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div className="container">
            <h3>List of Facilitator</h3>
            <hr />
            <div>
                <Link to="/addFacilitator" className="btn btn-primary mb-2">Add Facilitator</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Addresses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            facilitator.map(facilitator => (
                                <tr key={facilitator.id}>
                                    <td>{facilitator.name}</td>

                                    <td>
                                        <p> <Link to={`/facilitator/${facilitator.id}/address`}>Add Address</Link></p>
                                    </td>

                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/facilitator/update/${facilitator.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(facilitator.id);
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

export default FacilitatorList;


