import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userProfile from '../backendServices/userProfile.service';
import resumeService from "../backendServices/resume.service";
import languageService from "../backendServices/language.service";
import productService from "../backendServices/products.service";
import knowledgeService from "../backendServices/knowledge.service";
import programmingService from "../backendServices/programming.service";
import projectService from "../backendServices/project.service";
import projectDescriptionService from "../backendServices/projectDescription.service";
import standardsService from "../backendServices/standards.service"
import { Button, ButtonGroup } from "react-bootstrap";

const Update = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        education: "",
        yearOfBirth: "",
        nationality: "",
        projects: [
            {
                startDate: "",
                endDate: "",
                projectTitle: "",
                technologies: "",
                projectPosition: "",
                descriptions: [
                    {
                        projectDescription: ""
                    }
                ]
            }
        ],
        languages: [
            {
                language: "",
                proficiency: "",
            },
        ],
        products: [
            {
                productName: "",
            },
        ],
        programmings: [
            {
                languageName: "",
            },
        ],
        standards: [
            {
                standard: "",
            },
        ],
        knowledges: [
            {
                knowledge: "",
            },
        ]
    });
    const [image, setImage] = useState({
        preview: "",
        raw: "",
    });

    const { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        userProfile.getUser(id).then(response => {
            setProfile(response.data);

        })
    };
    const addBasicData = (e) => {
        let data = { ...profile };
        let fname = e.target.name;
        let val = e.target.value;

        data = { ...data, [fname]: val };

        setProfile(data);
    };
    const handleProjects = (e, index) => {
        let data = [...profile.projects]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        projectService.updateProject(index + 1, data[index]);
        setProfile({ ...profile, projects: data });
    };

    const handleDescription = (e, index, index2) => {
        let fname = e.target.name;
        let val = e.target.value;
        setProfile((prevState) => {
            prevState.projects[index2].descriptions[index][fname] = val;
            updateDescription(index, index2);
            return ({
                ...prevState
            })
        })
    };
    const updateDescription = (index, index2) => {
        let data = [...profile.projects[index2].descriptions]
        projectDescriptionService.updateDescription(data[index].id, data[index]);
        console.table(data);
    }

    const handleLanguages = (e, index) => {
        let data = [...profile.languages]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        languageService.updateLanguage(index + 1, data[index]);
        setProfile({ ...profile, languages: data });
    };

    const handleProducts = (e, index) => {
        let data = [...profile.products]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        productService.updateProduct(index + 1, data[index]);
        setProfile({ ...profile, products: data });
    };
    const handleProgrammings = (e, index) => {
        let data = [...profile.programmings]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        programmingService.updateProgramming(index + 1, data[index]);
        setProfile({ ...profile, programmings: data });
    };
    const handleStandards = (e, index) => {
        let data = [...profile.standards]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        standardsService.updateStandard(index + 1, data[index]);
        setProfile({ ...profile, standards: data });
    };
    const handleKnowledge = (e, index) => {
        let data = [...profile.knowledges]
        let fname = e.target.name;
        let val = e.target.value;
        data[index] = {
            ...data[index],
            [fname]: val
        }
        knowledgeService.updateKnowledge(index + 1, data[index]);
        setProfile({ ...profile, knowledges: data });
    };
    const addProjectFields = () => {
        setProfile((prevState) => {
            prevState.projects.push({
                startDate: "",
                endDate: "",
                projectPosition: "",
                projectTitle: "",
                technologies: "",
                descriptions: [{
                    projectDescription: "",
                }]
            });
            return ({
                ...prevState
            })
        })
    };
    const addLanguageFields = () => {
        let data = [...profile.languages];
        data.push({
            language: "",
            proficiency: "",

        });
        setProfile({ ...profile, languages: data });
    };

    const addDescriptionFields = (index) => {
        setProfile((prevState) => {
            prevState.projects[index].descriptions.push({
                projectDescription: "",
            })
            return ({
                ...prevState
            })
        })
    };


    const addPhoto = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };


    const addProductsFields = () => {
        let data = [...profile.products];
        data.push({
            productName: "",
        });
        setProfile({ ...profile, products: data });
    };
    const addProgrammingField = () => {
        let data = [...profile.programmings];
        data.push({
            languageName: "",
        });
        setProfile({ ...profile, programmings: data });
    };
    const addStandradsFiled = () => {
        let data = [...profile.standards];
        data.push({
            standard: "",

        });
        setProfile({ ...profile, standards: data });
    };
    const addKnowledgeField = () => {
        let data = [...profile.knowledges];
        data.push({
            knowledge: "",

        });
        setProfile({ ...profile, knowledges: data });
    };

    const removeDescriptionField = (index, index2) => {
        setProfile((prevState) => {
            prevState.projects[index2].descriptions.splice(index, 1);
            return ({
                ...prevState
            })
        })
    };

    const removeProjectField = (index) => {
        let data = [...profile.projects];
        data.splice(index, 1);
        setProfile({ ...profile, projects: data })
    };
    const removeLanguageField = (index) => {
        let data = [...profile.languages];
        data.splice(index, 1);
        setProfile({ ...profile, languages: data })
    };
    const removeProductField = (index) => {
        let data = [...profile.products];
        data.splice(index, 1);
        setProfile({ ...profile, products: data })
    };
    const removeProgrammingField = (index) => {
        let data = [...profile.programmings];
        data.splice(index, 1);
        setProfile({ ...profile, programmings: data })
    };
    const removeStandardField = (index) => {
        let data = [...profile.standards];
        data.splice(index, 1);
        setProfile({ ...profile, standards: data })
    };
    const removeKnowledgeField = (index) => {
        let data = [...profile.knowledges];
        data.splice(index, 1);
        setProfile({ ...profile, knowledges: data })
    };

    const uploadPhoto = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image.raw);
        userProfile.uploadPhoto(id, formData).then((response) => {
            alert("Photo uploaded Successfully");
        }, (error) => {
            alert("Something went Wrong!!!!");
        }
        );
    }

    const generatePDF = e => {
        e.preventDefault();
        const formData = new FormData();
        resumeService.generatePDF(id, formData).then((response) => {
            alert("PDF Generated Successfully \n check your directory");
        }, (error) => {
            alert("Something went Wrong!!!!");
        });
    };


    const updateToServer = (e) => {
        e.preventDefault();
        userProfile.updateUser(id, profile).then(
            (response) => {
                alert("User Updated Successfully");
            }, (error) => {
                alert("Operation failed");
            }
        );
    };

    return (

        <div>
            <div>
                <h3>Add Basic Info</h3>
            </div>
            <form onSubmit={(e) => updateToServer(e)}>
                <div className="input-group ">
                    <div className="input-group-prepend ">
                        <span className="input-group-text" id="">First and last name</span>
                    </div>
                    <input style={{ width: "10px" }}
                        type="text"
                        className="form-control"
                        placeholder="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={addBasicData}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={addBasicData}
                    />
                </div>
                <br>
                </br>
                <div className="input-group ">
                    <div className="input-group-prepend ">
                        <span className="input-group-text" id="">Education & YearOfBirth</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="education"
                        name="education"
                        value={profile.education}
                        onChange={addBasicData}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="yearOfBirth"
                        name="yearOfBirth"
                        value={profile.yearOfBirth}
                        onChange={addBasicData}
                    />
                </div>
                <br>
                </br>
                <div className="input-group ">
                    <div className="input-group-prepend ">
                        <span className="input-group-text" id="">Nationality</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="nationality"
                        name="nationality"
                        value={profile.nationality}
                        onChange={addBasicData}
                    />
                </div>
                <br>
                </br>
                <div>
                    <div>
                        <p>
                            <strong>Languages</strong>
                        </p>
                    </div>
                    {profile.languages.map((language, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">Language/Proficiency</span>
                                </div>
                                <input
                                    type="text" style={{ 'width': '0px' }}
                                    className="form-control"
                                    name="language"
                                    placeholder="language"
                                    defaultValue={language.language}
                                    onChange={(e) => handleLanguages(e, index)}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="proficiency"
                                    placeholder="proficiency"
                                    defaultValue={language.proficiency}
                                    onChange={(e) => handleLanguages(e, index)}
                                />
                            </div>
                            <br>
                            </br>
                            <ButtonGroup className="mb-2">
                                {profile.languages.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addLanguageFields()}>
                                        Add language
                                    </Button>}
                                {profile.languages.length !== 1 &&
                                    <Button variant="secondary" onClick={() => removeLanguageField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                        </div>
                    )
                    )}
                </div>

                <div>
                    <br></br>
                    <div>
                        <h3>Academic Info</h3>
                    </div>
                    {profile.products.map((product, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">ProductName</span>
                                </div>
                                <input style={{ width: "300px" }}
                                    type="text"
                                    className="form-control"
                                    name="productName"
                                    placeholder="productName"
                                    defaultValue={product.productName}
                                    onChange={(e) => handleProducts(e, index)}
                                />
                            </div>
                            <br></br>
                            <ButtonGroup className="mb-2">
                                {profile.products.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addProductsFields()}>
                                        Add Product
                                    </Button>}
                                {profile.products.length !== 1 &&
                                    <Button
                                        variant="secondary" onClick={() => removeProductField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                        </div>
                    ))}
                    <br></br>
                    {profile.programmings.map((programming, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">ProgrammingLanguage</span>
                                </div>
                                <input style={{ width: "300px" }}
                                    type="text"
                                    className="form-control"
                                    name="languageName"
                                    placeholder="ProgrammingLanguage"
                                    defaultValue={programming.languageName}
                                    onChange={(e) => handleProgrammings(e, index)}
                                />
                            </div>
                            <br></br>
                            <ButtonGroup className="mb-2">
                                {profile.programmings.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addProgrammingField()}>
                                        Add ProgrammingLanguage
                                    </Button>}
                                {profile.programmings.length !== 1 &&
                                    <Button
                                        variant="secondary" onClick={() => removeProgrammingField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                        </div>
                    ))}
                    <br></br>
                    {profile.standards.map((standrad, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">Standards</span>
                                </div>
                                <input style={{ width: "300px" }}
                                    type="text"
                                    className="form-control"
                                    name="standard"
                                    placeholder="standard"
                                    defaultValue={standrad.standard}
                                    onChange={(e) => handleStandards(e, index)}
                                />
                            </div>
                            <br></br>
                            <ButtonGroup className="mb-2">
                                {profile.standards.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addStandradsFiled()}>
                                        Add Standard
                                    </Button>}
                                {profile.standards.length !== 1 &&
                                    <Button variant="secondary" onClick={() => removeStandardField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                        </div>
                    ))}
                    <br></br>
                    {profile.knowledges.map((knowledge, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">Knowledges</span>
                                </div>
                                <input style={{ width: "300px" }}
                                    type="text"
                                    className="form-control"
                                    name="knowledge"
                                    placeholder="knowledge"
                                    defaultValue={knowledge.knowledge}
                                    onChange={(e) => handleKnowledge(e, index)}
                                />
                            </div>
                            <br></br>
                            <ButtonGroup className="mb-2">
                                {profile.knowledges.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addKnowledgeField()}>
                                        Add Knowledge
                                    </Button>}
                                {profile.knowledges.length !== 1 &&
                                    <Button variant="secondary" onClick={() => removeKnowledgeField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                        </div>
                    ))}
                </div>

                <div>
                    <br></br>
                    <div>
                        <h3>Projects</h3>
                    </div>
                    <br></br>
                    {profile.projects.map((project, index) => (
                        <div key={index}>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">StartDate & EndDate</span>
                                </div>
                                <input style={{ width: "300px" }}
                                    type="text"
                                    name="startDate"
                                    placeholder="MM/yy"
                                    defaultValue={project.startDate}
                                    onChange={(e) => handleProjects(e, index)}
                                />
                                <input style={{ width: "300px" }}
                                    type="text"
                                    placeholder="MM/yy OR today"
                                    name="endDate"
                                    defaultValue={project.endDate}
                                    onChange={(e) => handleProjects(e, index)}
                                />
                            </div>
                            <br></br>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">ProjectTitle</span>
                                </div>
                                <input style={{ width: "500px" }}
                                    type="text"
                                    placeholder="projectTitle"
                                    name="projectTitle"
                                    defaultValue={project.projectTitle}
                                    onChange={(e) => handleProjects(e, index)}
                                />
                            </div>
                            <br></br>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">ProjectPosition</span>
                                </div>
                                <input style={{ width: "475px" }}
                                    type="text"
                                    placeholder="projectPosition"
                                    name="projectPosition"
                                    defaultValue={project.projectPosition}
                                    onChange={(e) => handleProjects(e, index)}
                                />
                            </div>
                            <br></br>
                            <div className="input-group ">
                                <div className="input-group-prepend ">
                                    <span className="input-group-text" id="">Technologies</span>
                                </div>
                                <input style={{ width: "490px" }}
                                    type="text"
                                    placeholder="technologies"
                                    name="technologies"
                                    defaultValue={project.technologies}
                                    onChange={(e) => handleProjects(e, index)}
                                />
                            </div>
                            <br></br>
                            <ButtonGroup className="mb-2">
                                {profile.projects.length - 1 === index &&
                                    <Button variant="primary" onClick={() => addProjectFields()}>
                                        Add Projects
                                    </Button>}
                                {profile.projects.length !== 1 &&
                                    <Button variant="secondary" onClick={() => removeProjectField(index)}
                                    >
                                        Remove
                                    </Button>}
                            </ButtonGroup>
                            <br></br>
                            <br></br>
                            {project.descriptions.map((description, index2) => (

                                <div key={index2}>
                                    <div className="input-group ">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text" id="">ProjectDescription</span>
                                        </div>
                                        <input style={{ width: "955px" }}
                                            type="text"
                                            name="projectDescription"
                                            placeholder="projectDescription"
                                            defaultValue={description.projectDescription}
                                            onChange={(e) => handleDescription(e, index2, index)}
                                        />

                                    </div>
                                    <hr color="black"></hr>
                                    <br></br>
                                    <ButtonGroup className="mb-2">
                                        {project.descriptions.length - 1 === index2 &&
                                            <Button variant="primary" onClick={() => addDescriptionFields(index)} >
                                                Add Description
                                            </Button>}
                                        {project.descriptions.length !== 1 &&
                                            <Button variant="secondary" onClick={() => removeDescriptionField(index2, index)}
                                            >
                                                Remove
                                            </Button>}
                                    </ButtonGroup>
                                </div>

                            ))}

                        </div>


                    ))}

                </div>
                <br />
                <button type="submit" className='btn btn-outline-success my-2 text-center mr-2' > Update Data</button>
            </form >
            <br></br>
            <div>
                <h3>Upload Photo</h3>
            </div>
            <br></br>
            <input
                type="file"
                onChange={addPhoto}
            />

            <div>
                <br></br>
                <button className="btn btn-primary" onClick={uploadPhoto}>
                    upload
                </button>
            </div>
            <div className="form-group">
                <br />
                <button className="btn btn-primary" onClick={generatePDF}>
                    Generate Your Resume
                </button>
            </div>
        </div >
    );

};
export default Update;