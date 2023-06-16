import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressService from "../../../BackendServices/address.service";

const PersonAddress = () => {
    const [address, setAddress] = useState({
        city: "",
        email: "",
        fax: "",
        houseNo: "",
        mobile: "",
        phone: "",
        street: "",
        zip: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const addAddress = (e) => {
        let data = { ...address };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setAddress(data);
    };
    const submit = e => {
        e.preventDefault();
        AddressService.createPersonAddress(id, address)
        navigate(`/person/${id}/addresses`);
    };
    return (
        <div>
            <div>
                <p>
                    <strong>Add Address</strong>
                </p>
            </div>
            <form action="">
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        name="city"
                        placeholder="City"
                        defaultValue={address.city}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Email"
                        name="email"
                        defaultValue={address.email}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Fax"
                        name="fax"
                        defaultValue={address.fax}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="HouseNo"
                        name="houseNo"
                        defaultValue={address.houseNo}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Mobile"
                        name="mobile"
                        defaultValue={address.mobile}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        defaultValue={address.phone}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Street"
                        name="street"
                        defaultValue={address.street}
                        onChange={(e) => addAddress(e)}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        placeholder="Zip"
                        name="zip"
                        defaultValue={address.zip}
                        onChange={(e) => addAddress(e)}
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
export default PersonAddress;