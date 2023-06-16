import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import customerService from '../../../BackendServices/customer.service';

const PersonList = () => {
    const [customer, setCustomer] = useState(
        {
            person: {
                firstName: "",
                lastName: "",
                companyName: "",
                dateOfBirth: "",
                email: "",
                facebookReference: "",
                githubReference: "",
                homePage: "",
                instagramReference: "",
                linkedinReference: "",
                stackOverFlowReference: "",
                title: "",
                twitterReference: "",
                xingReference: "",
                photo: "",
            },
        }
    );
    const { id } = useParams();

    const init = () => {
        customerService.get(id)
            .then(response => {
                setCustomer(response.data);
            }).catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="container">
            <h3>Person Details</h3>
            <hr />
            <div>

                <table className="table table-bordered table-hover table-striped table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>CompanyName</th>
                            <th>DateOFBirth</th>
                            <th>Email</th>
                            <th>FacebookReference</th>
                            <th>FirstName</th>
                            <th>lastName</th>
                            <th>GithubReference</th>
                            <th>HomePage</th>
                            <th>InstagramReference</th>
                            <th>LinkedinReference</th>
                            <th>StackOverFlowReference</th>
                            <th>Title</th>
                            <th>TwitterReference</th>
                            <th>XingReference</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            <tr key={customer.id}>
                                <td>{customer.person.companyName}</td>
                                <td>{customer.person.dateOfBirth}</td>
                                <td>{customer.person.email}</td>
                                <td>{customer.person.facebookReference}</td>
                                <td>{customer.person.firstName}</td>
                                <td>{customer.person.lastName}</td>
                                <td>{customer.person.githubReference}</td>
                                <td>{customer.person.homePage}</td>
                                <td>{customer.person.instagramReference}</td>
                                <td>{customer.person.linkedinReference}</td>
                                <td>{customer.person.stackOverFlowReference}</td>
                                <td>{customer.person.title}</td>
                                <td>{customer.person.twitterReference}</td>
                                <td>{customer.person.xingReference}</td>
                                <td style={{ 'whiteSpace': 'nowrap' }}>
                                    <Link to={`/person/update/${customer.person.id}`} className="btn btn-outline-dark">Edit</Link>
                                </td>

                            </tr>

                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default PersonList;