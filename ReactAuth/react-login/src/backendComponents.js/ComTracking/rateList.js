import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RateService from '../../BackendServices/rate.service';

const RateList = () => {
    const [rate, setRate] = useState([]);
    const { id } = useParams();
    const init = () => {
        RateService.getAll(id)
            .then(response => {
                setRate(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }


    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id2) => {
        console.log('Printing id', id2);
        RateService.deleteRate(id2)
            .then(response => {
                alert("Rate deleted Successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    return (
        <div className="container">
            <h3>Rate Details</h3>
            <hr />
            <div>
                <Link to={`/project/${id}/rate`} className="btn btn-primary mb-2">Add Rate</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>Amount</th>
                            <th>EndDate</th>
                            <th>FixedPrice</th>
                            <th>Name</th>
                            <th>StartDate</th>
                            <th>Employees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rate.map(rate => (
                                <tr key={rate.id}>
                                    <td>{rate.amount}</td>
                                    <td>{rate.endDate}</td>
                                    <td>{rate.fixedPrice.toString()}</td>
                                    <td>{rate.name}</td>
                                    <td>{rate.startDate}</td>
                                    <td>
                                        <p> <Link to={`/rate/${rate.id}/employee`}>Add Employee</Link></p>
                                    </td>
                                    <td style={{ 'whiteSpace': 'nowrap' }}>

                                        <Link to={`/rate/${rate.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(rate.id);
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

export default RateList;
