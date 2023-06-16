import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonService from "../../../BackendServices/person.service";
import Grid from "@material-ui/core/Grid";

const UploadPhoto = () => {
    const [image, setImage] = useState({
        preview: "",
        raw: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const handleUpload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image.raw);

        PersonService.uploadPhoto(id, formData);
        navigate(-1);
    };
    return (
        <div>
            <h3 className="text-center">Upload your photo</h3>
            <label htmlFor="upload-button">


                <br />
                <Grid container justifyContent="center">
                    {image.preview ? (
                        <img src={image.preview} alt="dummy" width="300" height="300" />
                    ) : (
                        <>
                            <span className="fa-stack fa-2x mt-3 mb-2">
                                <i className="fas fa-circle fa-stack-2x" />
                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span>
                            <h5 className="text-center" style={{ 'cursor': 'pointer' }}>Click ON ME</h5>
                        </>
                    )}
                </Grid>
            </label>

            <input
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleChange}
            />
            <br />
            <div>
                <Grid container justifyContent="center">
                    <button className="btn btn-danger ml-2" style={{ textAlign: "center" }} onClick={handleUpload}>Upload</button>
                </Grid>
            </div>
        </div>
    );

}
export default UploadPhoto;