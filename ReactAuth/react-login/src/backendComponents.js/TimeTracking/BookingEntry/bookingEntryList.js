import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingEntryService from '../../../BackendServices/bookingEntry.service';

const BookingEntryList = () => {
    const [bookingEntry, setBookingEntry] = useState([]);
    const { id } = useParams();
    const init = () => {
        BookingEntryService.getAll()
            .then(response => {
                setBookingEntry(response.data);
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
        BookingEntryService.deleteBookingEntry(id)
            .then(response => {
                alert("BookingEntry Deleted successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    return (
        <div className="container">
            <h3>BookingEntryList</h3>
            <hr />
            <div>
                <Link to="/BookingEntry" className="btn btn-primary mb-2">Add BookingEntry</Link>
                <table className="table table-bordered table-hover table-striped table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>AltRate</th>
                            <th>approved</th>
                            <th>billable</th>
                            <th>billed</th>
                            <th>billingDate</th>
                            <th>created</th>
                            <th>duration</th>
                            <th>endDate</th>
                            <th>incomingPayment</th>
                            <th>lastChange</th>
                            <th>lastWTChange</th>
                            <th>locked</th>
                            <th>lockingDate</th>
                            <th>remoteId</th>
                            <th>startDate</th>
                            <th>project</th>
                            <th>rate</th>
                            <th>projectRole</th>
                            <th>Employees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingEntry.map(bookingEntry => (
                                <tr key={bookingEntry.id}>
                                    <td>{bookingEntry.altRate}</td>
                                    <td>{bookingEntry.approved.toString()}</td>
                                    <td>{bookingEntry.billable.toString()}</td>
                                    <td>{bookingEntry.billed.toString()}</td>
                                    <td>{bookingEntry.billingDate}</td>
                                    <td>{bookingEntry.created}</td>
                                    <td>{bookingEntry.duration}</td>
                                    <td>{bookingEntry.endDate}</td>
                                    <td>{bookingEntry.incomingPayment}</td>
                                    <td>{bookingEntry.lastChange}</td>
                                    <td>{bookingEntry.lastWTChange}</td>
                                    <td>{bookingEntry.locked.toString()}</td>
                                    <td>{bookingEntry.lockingDate}</td>
                                    <td>{bookingEntry.remoteId}</td>
                                    <td>{bookingEntry.startDate}</td>
                                    <td>

                                        <p> <Link to={`/project/get/${bookingEntry.id}`}>Project Details</Link></p>

                                    </td>
                                    <td>

                                        <p> <Link to={`/rate/get/${bookingEntry.id}`}>Rate Details</Link></p>

                                    </td>
                                    <td>

                                        <p> <Link to={`/projectRole/get/${bookingEntry.id}`}>projectRole Details</Link></p>

                                    </td>

                                    <td>
                                        <p> <Link to={`/bookingEntry/${bookingEntry.id}/employees`}>Add Employee</Link></p>
                                    </td>

                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/bookingEntry/update/${bookingEntry.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(bookingEntry.id);
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
export default BookingEntryList;