import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PersonService from '../../../BackendServices/person.service';

const PersonList = () => {
    const [person, setPerson] = useState([]);
    const { id } = useParams();
    const init = () => {
        PersonService.getAll()
            .then(response => {
                setPerson(response.data);
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
        PersonService.deletePerson(id)
            .then(response => {
                alert("Person deleted successfully");
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    return (
        <div className="container">
            <h3>PersonList</h3>
            <hr />
            <div>
                <Link to="/addPerson" className="btn btn-primary mb-2">Add Person</Link>
                <table className="table table-bordered table-hover table-striped table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>photo</th>
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
                            <th>Addresses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            person.map(person => (
                                <tr key={person.id}>
                                    <td>
                                        <p> <Link to={`/person/${person.id}/photo`}>Add Photo</Link></p>
                                    </td>
                                    <td>{person.firstName}</td>
                                    <td>{person.lastName}</td>
                                    <td>{person.companyName}</td>
                                    <td>{person.dateOfBirth}</td>
                                    <td>{person.email}</td>
                                    <td>{person.facebookReference}</td>
                                    <td>{person.githubReference}</td>
                                    <td>{person.homePage}</td>
                                    <td>{person.instagramReference}</td>
                                    <td>{person.linkedinReference}</td>
                                    <td>{person.stackOverFlowReference}</td>
                                    <td>{person.title}</td>
                                    <td>{person.twitterReference}</td>
                                    <td>{person.xingReference}</td>

                                    <td>
                                        <p> <Link to={`/person/${person.id}/address`}>Add Address</Link></p>
                                    </td>

                                    <td style={{ 'whiteSpace': 'nowrap' }}>
                                        <Link to={`/person/update/${person.id}`} className="btn btn-outline-dark">Edit</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => {
                                            handleDelete(person.id);
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
export default PersonList;