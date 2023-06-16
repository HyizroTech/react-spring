import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookingEntryService from "../../../BackendServices/bookingEntry.service";
import { Button } from "react-bootstrap";
import ZonedDateTime from "zoned-date-time";

let date = Date.now();
const BookingEntry = () => {
    const [bookingEntry, setBookingEntry] = useState
        ({
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
            project: {
                active: Boolean,
                billable: Boolean,
                budget: Number,
                contractId: "",
                currency: "",
                discount: Number,
                endDate: Date,
                finished: Boolean,
                fixedPrice: Boolean,
                name: "",
                recruiterId: "",
                remoteContractId: "",
                remoteId: Number,
                startDate: Date,
                timeBudget: Number,

            },
            rate: {
                amount: Number,
                endDate: ZonedDateTime,
                fixedPrice: Boolean,
                name: "",
                startDate: ZonedDateTime,

            },
            projectRole: {
                description: "",
                name: "",
                remoteId: Number,
            },

        });
    const navigate = useNavigate();
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
    const handleProject = (e) => {
        let data = { ...bookingEntry };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'active' || fname == 'billable' || fname == 'finished' || fname == 'fixedPrice') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = {
            ...data,
            project: {
                ...data.project,
                [fname]: val
            }
        };
        setBookingEntry(data);
    };
    const handleRate = (e) => {
        let data = { ...bookingEntry };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'fixedPrice') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = {
            ...data,
            rate: {
                ...data.rate,
                [fname]: val
            }
        };
        setBookingEntry(data);
    };
    const handleProjectRole = (e) => {
        let data = { ...bookingEntry };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            projectRole: {
                ...data.projectRole,
                [fname]: val
            }

        };
        setBookingEntry(data);

    };

    const submit = e => {
        e.preventDefault();
        bookingEntryService.create(bookingEntry);
        navigate("/bookingEntryList");
    };
    return (
        <div>
            <div>
                <p>
                    <strong>Booking Entry</strong>
                </p>
            </div>
            <form action="">
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
                <h4>Add project Details</h4>
                <label><strong>IsActive?</strong>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="active"
                                value="true"
                                checked={bookingEntry.project.active === true}
                                onChange={(e) => handleProject(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="active"
                                value="false"
                                checked={bookingEntry.project.active === false}
                                onChange={(e) => handleProject(e)} />
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
                                checked={bookingEntry.project.billable === true}
                                onChange={(e) => handleProject(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="billable"
                                value="false"
                                checked={bookingEntry.project.billable === false}
                                onChange={(e) => handleProject(e)} />
                            No
                        </label>
                    </div>
                </label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        placeholder="Budget"
                        name="budget"
                        defaultValue={bookingEntry.project.budget}
                        onInput={(e) => handleProject(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="ContractId"
                        name="contractId"
                        defaultValue={bookingEntry.project.contractId}
                        onChange={(e) => handleProject(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Currency"
                        name="currency"
                        defaultValue={bookingEntry.project.currency}
                        onChange={(e) => handleProject(e)}
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
                        placeholder="Discount"
                        name="discount"
                        defaultValue={bookingEntry.project.discount}
                        onInput={(e) => handleProject(e)}
                    />
                </div>
                <label><strong>EndDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="date"
                        placeholder="EndDate"
                        name="endDate"
                        defaultValue={bookingEntry.project.endDate}
                        onChange={(e) => handleProject(e)}
                    />
                </div>
                <label><strong>IsFinished?</strong>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="finished"
                                value="true"
                                checked={bookingEntry.project.finished === true}
                                onChange={(e) => handleProject(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="finished"
                                value="false"
                                checked={bookingEntry.project.finished === false}
                                onChange={(e) => handleProject(e)} />
                            No
                        </label>
                    </div>
                </label>
                <label><strong>IsFixedPrice?</strong>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="fixedPrice"
                                value="true"
                                checked={bookingEntry.project.fixedPrice === true}
                                onChange={(e) => handleProject(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="fixedPrice"
                                value="false"
                                checked={bookingEntry.project.fixedPrice === false}
                                onChange={(e) => handleProject(e)} />
                            No
                        </label>
                    </div>
                </label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Name"
                        name="name"
                        defaultValue={bookingEntry.project.name}
                        onChange={(e) => handleProject(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="RecruiterId"
                        name="recruiterId"
                        defaultValue={bookingEntry.project.recruiterId}
                        onChange={(e) => handleProject(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="RemoteContractId"
                        name="remoteContractId"
                        defaultValue={bookingEntry.project.remoteContractId}
                        onChange={(e) => handleProject(e)}
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
                        placeholder="RemoteId"
                        name="remoteId"
                        defaultValue={bookingEntry.project.remoteId}
                        onInput={(e) => handleProject(e)}
                    />
                </div>
                <label><strong>startDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="date"
                        placeholder="StartDate"
                        name="startDate"
                        defaultValue={bookingEntry.project.startDate}
                        onChange={(e) => handleProject(e)}
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
                        placeholder="TimeBudget"
                        name="timeBudget"
                        defaultValue={bookingEntry.project.timeBudget}
                        onInput={(e) => handleProject(e)}
                    />
                </div>
                <h4>Add Rate Details</h4>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        placeholder="Amount"
                        name="amount"
                        defaultValue={bookingEntry.rate.amount}
                        onInput={(e) => handleRate(e)}
                    />
                </div>
                <label><strong>EndDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="EndDate"
                        name="endDate"
                        defaultValue={bookingEntry.rate.endDate}
                        onChange={(e) => handleRate(e)}
                    />
                </div>
                <label><strong>FixedPrice?</strong>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="fixedPrice"
                                value="true"
                                checked={bookingEntry.rate.fixedPrice === true}
                                onChange={(e) => handleRate(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="fixedPrice"
                                value="false"
                                checked={bookingEntry.rate.fixedPrice === false}
                                onChange={(e) => handleRate(e)} />
                            No
                        </label>
                    </div>
                </label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Name"
                        name="name"
                        defaultValue={bookingEntry.rate.name}
                        onChange={(e) => handleRate(e)}
                    />
                </div>
                <label><strong>StartDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="StartDate"
                        name="startDate"
                        defaultValue={bookingEntry.rate.startDate}
                        onChange={(e) => handleRate(e)}
                    />
                </div>
                <h4> Project_Role Details</h4>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Description"
                        name="description"
                        defaultValue={bookingEntry.projectRole.description}
                        onChange={(e) => handleProjectRole(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Name"
                        name="name"
                        defaultValue={bookingEntry.projectRole.name}
                        onChange={(e) => handleProjectRole(e)}
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
                        placeholder="RemoteId"
                        name="remoteId"
                        defaultValue={bookingEntry.projectRole.remoteId}
                        onInput={(e) => handleProjectRole(e)}
                    />
                </div>

            </form>
            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );

}
export default BookingEntry;