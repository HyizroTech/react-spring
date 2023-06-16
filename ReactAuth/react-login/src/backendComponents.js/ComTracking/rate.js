import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RateService from "../../BackendServices/rate.service";
import ZonedDateTime from "zoned-date-time";
import { Button } from "react-bootstrap";
const AddRate = () => {
    const [rate, setRate] = useState({
        amount: Number,
        endDate: ZonedDateTime,
        fixedPrice: Boolean,
        name: "",
        startDate: ZonedDateTime,
    }
    );
    const navigate = useNavigate();
    const { id } = useParams();
    const addRate = (e) => {
        let data = { ...rate };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'fixedPrice') {
            val = e.target.value === 'true' ? true : false;
        }
        else {
            val = e.target.value;
        }

        data = { ...data, [fname]: val };
        setRate(data);
    };

    const submit = e => {
        e.preventDefault();
        RateService.create(id, rate);
        navigate(`/project/${id}/rates`);
    };
    return (
        <div>
            <div>
                <p><strong>Add Rate</strong></p>
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
                        placeholder="Amount"
                        name="amount"
                        defaultValue={rate.amount}
                        onInput={(e) => addRate(e)}
                    />
                </div>
                <label><strong>EndDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="EndDate"
                        name="endDate"
                        defaultValue={rate.endDate}
                        onChange={(e) => addRate(e)}
                    />
                </div>
                <label><strong>FixedPrice?</strong>
                    <div className="form-group">
                        <label>
                            <input

                                type="checkbox"
                                name="fixedPrice"
                                value="true"
                                checked={rate.fixedPrice === true}
                                onChange={(e) => addRate(e)} />
                            Yes
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="fixedPrice"
                                value="false"
                                checked={rate.fixedPrice === false}
                                onChange={(e) => addRate(e)} />
                            No
                        </label>
                    </div>
                </label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Name"
                        name="name"
                        defaultValue={rate.name}
                        onChange={(e) => addRate(e)}
                    />
                </div>
                <label><strong>StartDate</strong></label>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="StartDate"
                        name="startDate"
                        defaultValue={rate.startDate}
                        onChange={(e) => addRate(e)}
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
export default AddRate;