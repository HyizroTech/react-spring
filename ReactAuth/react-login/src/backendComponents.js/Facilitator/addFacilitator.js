import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facilitatorService from "../../BackendServices/facilitator.service";
import { Button } from "react-bootstrap";
const Facilitator = () => {
    const [facilitator, setFacilitator] = useState({
        name: "",

    });
    const navigate = useNavigate();

    const addFacilitator = (e) => {
        let data = { ...facilitator };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setFacilitator(data);
    };

    const submit = e => {
        e.preventDefault();
        facilitatorService.create(facilitator)
        navigate("/facilitatorList");
    };
    return (
        <div>
            <div>
                <p>
                    <strong>Add Facilitator</strong>
                </p>
            </div>
            <form action="">
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={facilitator.name}
                        onChange={addFacilitator}
                    />
                </div>

            </form >
            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
export default Facilitator;