import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RateService from '../../BackendServices/rate.service';
import ZonedDateTime from "zoned-date-time";
const UpdateRate = () => {
    const [rate, setRate] = useState({
        amount: Number,
        endDate: ZonedDateTime,
        fixedPrice: Boolean,
        name: "",
        startDate: ZonedDateTime,

    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        RateService.get(id).then(response => {
            setRate(response.data);
        })
    };
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

    const updateDataToServer = (data) => {
        RateService.update(id, data).then(
            (response) => {
                alert("Rate Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(rate);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Rate!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Amount</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        name="amount"
                                        defaultValue={rate.amount}
                                        onInput={(e) => addRate(e)}
                                    />
                                </div>
                                <label htmlFor="exampleInputEmail1">EndDate</label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        name="endDate"
                                        defaultValue={rate.endDate}
                                        onChange={(e) => addRate(e)}
                                    />
                                </div>
                                <label htmlFor="exampleInputEmail1">FixedPrice?</label>
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
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        name="name"
                                        defaultValue={rate.name}
                                        onChange={(e) => addRate(e)}
                                    />
                                </div>
                                <label htmlFor="exampleInputEmail1">startDate</label>
                                <div className="form-group">
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        name="startDate"
                                        defaultValue={rate.startDate}
                                        onChange={(e) => addRate(e)}
                                    />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Rate</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateRate;
