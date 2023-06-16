import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import groupService from "../../../BackendServices/group.service";
const Group = () => {
    const [group, setGroup] = useState(
        {
            groups: Boolean,
            name: "",
            user: Boolean,

        }
    );
    const navigate = useNavigate();
    const addGroup = (e) => {
        let data = { ...group };
        let fname = e.target.name;
        let val = e.target.value;
        if (fname == 'groups' || fname == 'user') {
            val = e.target.value === 'true' ? true : false;
        }

        else {
            val = e.target.value;
        }
        data = { ...data, [fname]: val };
        setGroup(data);
    };
    const submit = e => {
        e.preventDefault();
        groupService.create(group)
        navigate("/groupList");
    };
    return (
        <div>
            <div>
                <h3>Group Details</h3>
            </div>
            <form action="">
                <div className="form-group">
                    <label><strong>IsGroup?</strong>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="groups"
                                    value="true"
                                    checked={group.groups === true}
                                    onChange={addGroup} />
                                Yes
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input

                                    type="checkbox"
                                    name="groups"
                                    value="false"
                                    checked={group.groups === false}
                                    onChange={addGroup} />
                                No
                            </label>
                        </div>
                    </label>
                </div>

                <div className="form-group">
                    <input style={{ width: "300px" }}
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={group.name}
                        onChange={addGroup}
                    />
                </div>

                <div className="form-group">
                    <label><strong>IsUser?</strong>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="user"
                                    value="true"
                                    checked={group.user === true}
                                    onChange={addGroup} />
                                Yes
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <input

                                    type="checkbox"
                                    name="user"
                                    value="false"
                                    checked={group.user === false}
                                    onChange={addGroup} />
                                No
                            </label>
                        </div>
                    </label>
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
export default Group;