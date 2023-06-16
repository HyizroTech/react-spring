import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from '../../BackendServices/configData.service';
const UpdateData = () => {
    const [configData, setConfigData] = useState({
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
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        DataService.get(id).then(response => {
            setConfigData(response.data);
        })
    };
    const handleTenant = (e) => {
        let data = { ...configData };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            tenant: {
                ...data.tenant,
                [fname]: val
            }
        };
        setConfigData(data);
    };
    const handleLanguage = (e) => {
        let data = { ...configData };
        let fname = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            language: {
                ...data.language,
                [fname]: val
            }
        };
        setConfigData(data);
    };
    const addData = (e) => {
        let data = { ...configData };
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
        setConfigData(data);
    };

    const updateDataToServer = (data) => {
        DataService.update(id, data).then(
            (response) => {
                alert("Data Updated Successfully");
                navigate("/Data");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(configData);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Data!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >Username</label>
                                    <input type="text" className="form-control" name="userName" placeholder="Enter Here" value={configData.userRock.userName} onChange={(e) => addData(e)} />
                                </div>
                                <div>
                                    <label>IsGroup?
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="isGroup"
                                                value="true"
                                                checked={configData.userRock.isGroup === true}
                                                onChange={addData} />
                                            Yes
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="isGroup"
                                            value="false"
                                            checked={configData.userRock.isGroup === false}
                                            onChange={addData} />
                                        No
                                    </label>
                                </div>
                                <div>
                                    <label>IsUser?
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="isUser"
                                                value="true"
                                                checked={configData.userRock.isUser === true}
                                                onChange={addData} />
                                            Yes
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="isUser"
                                            value="false"
                                            checked={configData.userRock.isUser === false}
                                            onChange={addData} />
                                        No
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">CompanyName</label>
                                    <input type="text" className="form-control" name="companyName" placeholder="Enter Here" value={configData.tenant.companyName} onChange={(e) => handleTenant(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Logo Reference</label>
                                    <input type="text" className="form-control" name="logoRef" placeholder="Enter Here" value={configData.tenant.logoRef} onChange={(e) => handleTenant(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">ISO</label>
                                    <input type="text" className="form-control" name="iso" placeholder="Enter Here" value={configData.language.iso} onChange={(e) => handleLanguage(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Label</label>
                                    <input type="text" className="form-control" name="label" placeholder="Enter Here" value={configData.language.label} onChange={(e) => handleLanguage(e)} />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Data</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateData
