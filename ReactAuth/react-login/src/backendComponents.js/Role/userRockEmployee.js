import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from '../../BackendServices/userRock.service';
const UserEmployeeList = () => {
    const [userRock, setUserRock] = useState(
        {
            employee: {
                active: Boolean,
                external: Boolean,
                hrId: "",
                intern: Boolean,
                remoteId: Number,
            }
        }
    );
    const { id } = useParams();

    const init = () => {
        UserService.get(id)
            .then(response => {
                setUserRock(response.data);
            }).catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="container">
            <h3>Employee Details</h3>
            <hr />
            <div>

                <table className="table table-bordered table-hover table-striped table-responsive ">
                    <thead className="thead-dark">
                        <tr>

                            <th>active</th>
                            <th>external</th>
                            <th>hrId</th>
                            <th>intern</th>
                            <th>remoteId</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>companyName</th>
                            <th>dateOfBirth</th>
                            <th>email</th>
                            <th>facebookReference</th>
                            <th>githubReference</th>
                            <th>homePage</th>
                            <th>instagramReference</th>
                            <th>linkedinReference</th>
                            <th>stackOverFlowReference</th>
                            <th>title</th>
                            <th>twitterReference</th>
                            <th>xingReference</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            <tr key={userRock.id}>
                                <td>{userRock.employee.active.toString()}</td>
                                <td>{userRock.employee.external.toString()}</td>
                                <td>{userRock.employee.hrId}</td>
                                <td>{userRock.employee.intern.toString()}</td>
                                <td>{userRock.employee.remoteId}</td>
                                <td>{userRock.employee.firstName}</td>
                                <td>{userRock.employee.lastName}</td>
                                <td>{userRock.employee.companyName}</td>
                                <td>{userRock.employee.dateOfBirth}</td>
                                <td>{userRock.employee.email}</td>
                                <td>{userRock.employee.facebookReference}</td>
                                <td>{userRock.employee.githubReference}</td>
                                <td>{userRock.employee.homePage}</td>
                                <td>{userRock.employee.instagramReference}</td>
                                <td>{userRock.employee.linkedinReference}</td>
                                <td>{userRock.employee.stackOverFlowReference}</td>
                                <td>{userRock.employee.title}</td>
                                <td>{userRock.employee.twitterReference}</td>
                                <td>{userRock.employee.xingReference}</td>

                                <td style={{ 'whiteSpace': 'nowrap' }}>
                                    <Link to={`/employee/${userRock.employee.id}`} className="btn btn-outline-dark">Edit</Link>
                                </td>

                            </tr>

                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default UserEmployeeList;