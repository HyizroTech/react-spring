import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configData from "../../BackendServices/configData.service";

const DataConfig = () => {
    const [dataConfig, setDataConfig] = useState({
        userRock: {
            isGroup: Boolean,
            isUser: Boolean,
            userName: "",
        },
        tenant: {
            companyName: "",
            logoRef: "",
        },
        language: {
            iso: "",
            label: "",
        },
    });
    const navigate = useNavigate();

    const addData = (e) => {
        let data = { ...dataConfig };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'isGroup' || fname == 'isUser') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = {
            ...data,
            userRock: {
                ...data.userRock,
                [fname]: val
            }
        };
        setDataConfig(data);
    };
    const handleAddTenant = (e) => {
        let data = { ...dataConfig };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            tenant: {
                ...data.tenant,
                [fname]: val
            }
        };
        setDataConfig(data);
    }
    const handleAddLanguage = (e) => {
        let data = { ...dataConfig };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            language: {
                ...data.language,
                [fname]: val
            }
        };
        setDataConfig(data);
    };


    const submit = e => {
        e.preventDefault();
        configData.create(dataConfig)
        navigate("/Data");
    };
    return (
        <div>
            <div>
                <h3>Add User Details</h3>
            </div>
            <form action="">
                <div className="form-group">
                    <label><strong>IsGroup?</strong>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isGroup"
                                    value="true"
                                    checked={dataConfig.userRock.isGroup === true}
                                    onChange={addData} />
                                Yes
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input

                                    type="checkbox"
                                    name="isGroup"
                                    value="false"
                                    checked={dataConfig.userRock.isGroup === false}
                                    onChange={addData} />
                                No
                            </label>
                        </div>
                    </label>
                </div>
                <div className="form-group">
                    <label><strong>IsUser?</strong>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isUser"
                                    value="true"
                                    checked={dataConfig.userRock.isUser === true}
                                    onChange={addData} />
                                Yes
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input

                                    type="checkbox"
                                    name="isUser"
                                    value="false"
                                    checked={dataConfig.userRock.isUser === false}
                                    onChange={addData} />
                                No
                            </label>
                        </div>
                    </label>
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="userName"
                        name="userName"
                        value={dataConfig.userRock.userName}
                        onChange={addData}
                    />
                </div>
                <div>
                    <p>
                        <strong>Add Tenant Details</strong>
                    </p>
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="companyName"
                        name="companyName"
                        value={dataConfig.tenant.companyName}
                        onChange={handleAddTenant}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="logoRef"
                        name="logoRef"
                        value={dataConfig.tenant.logoRef}
                        onChange={handleAddTenant}
                    />
                </div>
                <div>
                    <p>
                        <strong>Add language Details</strong>
                    </p>
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="iso"
                        name="iso"
                        value={dataConfig.language.iso}
                        onChange={handleAddLanguage}
                    />
                </div>
                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="label"
                        name="label"
                        value={dataConfig.language.label}
                        onChange={handleAddLanguage}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={submit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
export default DataConfig;