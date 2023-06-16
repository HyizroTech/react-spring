import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from '../../../BackendServices/customer.service';
const UpdateCustomer = () => {
    const [customer, setCustomer] = useState({
        name: "",
        remoteCustomerId: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        CustomerService.get(id).then(response => {
            setCustomer(response.data);
        })
    };


    const addData = (e) => {
        let data = { ...customer };
        let fname = e.target.name;
        let val = e.target.value;

        data = { ...data, [fname]: val }

        setCustomer(data);
    };

    const updateDataToServer = (data) => {
        CustomerService.update(id, data).then(
            (response) => {
                alert("Customer Updated Successfully");
                navigate("/customerList");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(customer);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Customer!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Here" value={customer.name} onChange={(e) => addData(e)} />
                                </div>
                                <div className="form-group">
                                    <label >remoteCustomerId</label>
                                    <input type="text" className="form-control" name="remoteCustomerId" placeholder="Enter Here" value={customer.remoteCustomerId} onChange={(e) => addData(e)} />
                                </div>

                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Customer</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateCustomer
