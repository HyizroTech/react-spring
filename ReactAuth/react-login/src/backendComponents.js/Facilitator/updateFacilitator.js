import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FacilitatorService from '../../BackendServices/facilitator.service';
const UpdateFacilitator = () => {
    const [facilitator, setFacilitator] = useState({
        name: "",

    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, [])

    const init = () => {
        FacilitatorService.get(id).then(response => {
            setFacilitator(response.data);
        })
    };


    const addData = (e) => {
        let data = { ...facilitator };
        let fname = e.target.name;
        let val = e.target.value;

        data = { ...data, [fname]: val }

        setFacilitator(data);
    };

    const updateDataToServer = (data) => {
        FacilitatorService.update(id, data).then(
            (response) => {
                alert("Facilitator Updated Successfully");
                navigate("/facilitatorList");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };
    const FormHandle = e => {
        e.preventDefault();
        updateDataToServer(facilitator);
    };
    return (
        <div>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-2 bg-light">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center">Update Facilitator!</h1>
                        <div>
                            <form onSubmit={e => FormHandle(e)}>
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Here" value={facilitator.name} onChange={(e) => addData(e)} />
                                </div>


                                <div className="container text-center">
                                    <button type="submit" className="btn btn-outline-success my-2 text-center mr-2">Update Facilitator</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default UpdateFacilitator;
