import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingEntryService from '../../../BackendServices/bookingEntry.service';
import ZonedDateTime from "zoned-date-time";

const UpdateBookingEntry = () => {
    const [bookingEntry, setBookingEntry] = useState({
        altRate: Number,
        approved: Boolean,
        billable: Boolean,
        billed: Boolean,
        billingDate: ZonedDateTime,
        created: ZonedDateTime,
        duration: Number,
        endDate: ZonedDateTime,
        incomingPayment: ZonedDateTime,
        lastChange: ZonedDateTime,
        lastWTChange: ZonedDateTime,
        locked: Boolean,
        lockingDate: ZonedDateTime,
        remoteId: "",
        startDate: ZonedDateTime,
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        BookingEntryService.get(id).then(response => {
            setBookingEntry(response.data);
        })
    };


    const addBookingEntry = (e) => {
        let data = { ...bookingEntry };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'approved' || fname == 'billable' || fname == 'billed' || fname == 'locked') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }

        data = { ...data, [fname]: val };
        setBookingEntry(data);
    };

    const updateDataToServer = (data) => {
        BookingEntryService.update(id, data).then(
            (response) => {
                alert("BookingEntry Updated Successfully");
                navigate("/bookingEntryList");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(bookingEntry);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update BookingEntry!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="AltRate"
                                        name="altRate"
                                        defaultValue={bookingEntry.altRate}
                                        onInput={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>Approved?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="approved"
                                                value="true"
                                                checked={bookingEntry.approved === true}
                                                onChange={(e) => addBookingEntry(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="approved"
                                                value="false"
                                                checked={bookingEntry.approved === false}
                                                onChange={(e) => addBookingEntry(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>Billable?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="billable"
                                                value="true"
                                                checked={bookingEntry.billable === true}
                                                onChange={(e) => addBookingEntry(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="billable"
                                                value="false"
                                                checked={bookingEntry.billable === false}
                                                onChange={(e) => addBookingEntry(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>Billed?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="billed"
                                                value="true"
                                                checked={bookingEntry.billed === true}
                                                onChange={(e) => addBookingEntry(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="billed"
                                                value="false"
                                                checked={bookingEntry.billed === false}
                                                onChange={(e) => addBookingEntry(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>billingDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="BiliingDate"
                                        name="billingDate"
                                        defaultValue={bookingEntry.billingDate}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>Created</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Created"
                                        name="created"
                                        defaultValue={bookingEntry.created}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="Duration"
                                        name="duration"
                                        defaultValue={bookingEntry.duration}
                                        onInput={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>EndDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="EndDate"
                                        name="endDate"
                                        defaultValue={bookingEntry.endDate}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>IncomingPayment</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="incomingPayemnt"
                                        name="incomingPayment"
                                        defaultValue={bookingEntry.incomingPayment}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>LastChange</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="LastChange"
                                        name="lastChange"
                                        defaultValue={bookingEntry.lastChange}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>LastWTChange</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="LastWTChange"
                                        name="lastWTChange"
                                        defaultValue={bookingEntry.lastWTChange}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>Locked?</strong>
                                    <div className="form-group">
                                        <label>
                                            <input

                                                type="checkbox"
                                                name="locked"
                                                value="true"
                                                checked={bookingEntry.locked === true}
                                                onChange={(e) => addBookingEntry(e)} />
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="locked"
                                                value="false"
                                                checked={bookingEntry.locked === false}
                                                onChange={(e) => addBookingEntry(e)} />
                                            No
                                        </label>
                                    </div>
                                </label>
                                <label><strong>LockingDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="LockingDate"
                                        name="lockingDate"
                                        defaultValue={bookingEntry.lockingDate}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="RemoteId"
                                        name="remoteId"
                                        defaultValue={bookingEntry.remoteId}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>
                                <label><strong>StartDate</strong></label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="StartDate"
                                        name="startDate"
                                        defaultValue={bookingEntry.startDate}
                                        onChange={(e) => addBookingEntry(e)}
                                    />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update BookingEntry</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default UpdateBookingEntry;
