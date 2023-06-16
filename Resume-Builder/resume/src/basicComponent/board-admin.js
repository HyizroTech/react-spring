import React, { useState, useEffect } from 'react';
import UserService from '../AuthServices/user.service'
import EventBus from "../common/EventBus";


const BoardAdmin = () => {
    const [footer, setFooter] = useState({});
    const [header, setHeader] = useState({});
    const [image, setImage] = useState({
        preview: "",
        raw: "",
    });

    useEffect(() => {
        UserService.getFooter(1).then(
            (response) => {
                setFooter(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setFooter(_content);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }

        );
    }, []);

    useEffect(() => {
        UserService.getHeader(1).then(
            (response) => {
                setHeader(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setHeader(_content);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }

        );
    }, []);




    const updateFooter = (e) => {
        let data = { ...footer };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setFooter(data);
    };

    const updateFooterToServer = (e) => {
        e.preventDefault();
        UserService.updateFooter(1, footer).then(
            (response) => {
                alert("Footer Updated Successfully");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    const updateHeader = (e) => {
        let data = { ...header };
        let fname = e.target.name;
        let val = e.target.value;
        data = { ...data, [fname]: val };
        setHeader(data);
    };

    const addLogo = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const uploadLogo = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image.raw);
        UserService.uploadPhoto(1, formData).then(() => {
            alert("Photo uploaded Successfully");
        }, (error) => {
            alert("Something went Wrong!!!!");
        }
        );
    }

    const updateHeaderToServer = (e) => {
        e.preventDefault();
        UserService.updateHeader(1, header).then(
            (response) => {
                alert("Header Updated Successfully");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    return (
        <div className="container">

            <h3>Footer</h3>
            <hr color="black" />
            <div>
                <form onSubmit={e => updateFooterToServer(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>CompanyName</label>
                            <input type="text" className="form-control" name="companyName" defaultValue={footer.companyName} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>City</label>
                            <input type="text" className="form-control" name="city" defaultValue={footer.city} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Street</label>
                            <input type="text" className="form-control" name="street" defaultValue={footer.street} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Zip</label>
                            <input type="text" className="form-control" name="zip" defaultValue={footer.zip} onChange={updateFooter} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Website</label>
                            <input type="text" className="form-control" name="website" defaultValue={footer.website} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Telephone</label>
                            <input type="text" className="form-control" name="telephone" defaultValue={footer.telephone} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Fax</label>
                            <input type="text" className="form-control" name="fax" defaultValue={footer.fax} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" defaultValue={footer.email} onChange={updateFooter} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Company Local Court</label>
                            <input type="text" className="form-control" name="companyLocalCourt" defaultValue={footer.companyLocalCourt} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Partner Local Court</label>
                            <input type="text" className="form-control" name="partnerLocalCourt" defaultValue={footer.partnerLocalCourt} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Registered Office</label>
                            <input type="text" className="form-control" name="registeredOffice" defaultValue={footer.registeredOffice} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Sales Tax Id</label>
                            <input type="text" className="form-control" name="salesTaxId" defaultValue={footer.salesTaxId} onChange={updateFooter} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>Bank</label>
                            <input type="text" className="form-control" name="bank" defaultValue={footer.bank} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Iban</label>
                            <input type="text" className="form-control" name="iban" defaultValue={footer.iban} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Partner</label>
                            <input type="text" className="form-control" name="partner" defaultValue={footer.partner} onChange={updateFooter} />
                        </div>
                        <div className="form-group col-md-3">
                            <label>Director's</label>
                            <input type="text" className="form-control" name="director" defaultValue={footer.director} onChange={updateFooter} />
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <button type="submit" className='btn btn-outline-success my-2 text-center mr-2' > Update Footer</button>
                    </div>
                </form>
            </div>
            <br />
            <br />
            <div>
                <h3>Header</h3>
                <hr color="black" />
            </div>
            <div>
                <form onSubmit={e => updateHeaderToServer(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>CompanyName</label>
                            <input type="text" className="form-control" name="companyName" defaultValue={header.companyName} onChange={updateHeader} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>City</label>
                            <input type="text" className="form-control" name="city" defaultValue={header.city} onChange={updateHeader} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Street</label>
                            <input type="text" className="form-control" name="street" defaultValue={header.street} onChange={updateHeader} />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Zip</label>
                            <input type="text" className="form-control" name="zip" defaultValue={header.zipCode} onChange={updateHeader} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <h5>Change Logo</h5>
                    </div>

                    <input
                        type="file"
                        onChange={addLogo}
                    />
                    <button className="btn btn-primary" onClick={uploadLogo}>
                        upload
                    </button>
                    <br />
                    <br />
                    <div>
                        <button type="submit" className='btn btn-outline-success my-2 text-center mr-2' > Update Header</button>
                    </div>
                </form>
            </div>
        </div >

    );
};
export default BoardAdmin;