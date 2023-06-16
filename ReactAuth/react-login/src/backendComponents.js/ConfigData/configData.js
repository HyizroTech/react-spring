import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataService from '../../BackendServices/configData.service';

const DataList = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const init = () => {
        DataService.getAll()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        DataService.deleteData(id)
            .then(response => {
                alert("Data deleted Successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    return (
        <div className="container">
            <h3>Data Config</h3>
            <hr />

            <div>
                <Link to="/addData" className="btn btn-primary mb-2">Add Data</Link>
                <table className="table table-bordered table-hover table-striped ">
                    <thead className="thead-dark">
                        <tr>
                            <th>UserInfo</th>
                            <th>TenantInfo</th>
                            <th>Language</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(data1 => (
                                <tr key={data1.id}>

                                    <td>UserName: {data1.userRock.userName}<br />

                                        Is Group?  {String(data1.userRock.isGroup)}<br />

                                        Is User? {String(data1.userRock.isUser)}
                                    </td>

                                    <td>Company Name: {data1.tenant.companyName}<br />
                                        LogoRef: {data1.tenant.logoRef}
                                    </td>

                                    <td>Iso: {data1.language.iso}<br />
                                        Label: {data1.language.label}
                                    </td>


                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/update-Data/${data1.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(data1.id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default DataList;
