import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddressService from '../../../BackendServices/address.service';

const UpdateAddress = () => {
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
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        AddressService.get(id).then(response => {
            setAddress(response.data);
        })
    };

    const addAddress = (e) => {
        let data = { ...address };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setAddress(data);
    };

    const updateDataToServer = (data) => {
        AddressService.updateAddress(id, data).then(
            (response) => {
                alert("Address Updated Successfully");
                navigate(-1);
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(address);
    };

    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Address!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label>City</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        defaultValue={address.city}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        defaultValue={address.email}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fax</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Fax"
                                        name="fax"
                                        defaultValue={address.fax}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>HouseNo</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="HouseNo"
                                        name="houseNo"
                                        defaultValue={address.houseNo}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Mobile"
                                        name="mobile"
                                        defaultValue={address.mobile}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        defaultValue={address.phone}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Street</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Street"
                                        name="street"
                                        defaultValue={address.street}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zip</label>
                                    <input style={{ width: "300px" }}
                                        type="text"
                                        placeholder="Zip"
                                        name="zip"
                                        defaultValue={address.zip}
                                        onChange={(e) => addAddress(e)}
                                    />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Address</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )

}
export default UpdateAddress;