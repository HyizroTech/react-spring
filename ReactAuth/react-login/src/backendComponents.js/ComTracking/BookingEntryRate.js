import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RateService from '../../BackendServices/rate.service';

const RateList = () => {
    const [rate, setRate] = useState([]);
    const { id } = useParams();
    const init = () => {
        RateService.get(id)
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


    return (
        <div className="container">
            <h3>Rate Details</h3>
            <hr />
            <table className="table table-bordered table-hover table-striped ">
                <thead className="thead-dark">
                    <tr>
                        <th>Amount</th>
                        <th>EndDate</th>
                        <th>FixedPrice</th>
                        <th>Name</th>
                        <th>StartDate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr key={rate.id}>
                        <td>{rate.amount}</td>
                        <td>{rate.endDate}</td>
                        <td>{String(rate.fixedPrice)}</td>
                        <td>{rate.name}</td>
                        <td>{rate.startDate}</td>
                        <td style={{ 'whiteSpace': 'nowrap' }}>
                            <Link className="btn btn-outline-dark" to={`/rate/${rate.id}`}>Edit</Link>
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>

    );
}

export default RateList;
