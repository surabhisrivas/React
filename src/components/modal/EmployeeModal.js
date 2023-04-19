import React from "react";
import { useState } from 'react';
import './EmployeeModal.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeModal = (props) => {
    const [values, setValues] = useState({
        id: null,
        username: '',
        email: '',
        phone: null,
        avatar: null
    });

    const [file, setFile] = useState(props.userData?.avatar);
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.userData) {
            let empData = createData(props.userData.id);
            if (empData) {
                Object.keys(empData).forEach((element) => {
                    if (!empData[element]) {
                        empData[element] = props.userData[element];
                    }
                })
                fetch('http://localhost:3030/employee/' + props.userData.id, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(empData)
                }).then((data) => {
                    toast.success('Updated Successfully!');
                    props.onCreateClose();
                    return data.json();
                }).catch((error) => {
                    console.log("e", error);
                })
            }
        }
        else {
            let empData = createData();
            fetch('http://localhost:3030/employee', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(empData)
            }).then((data) => {
                toast.success('Added Successfully!');
                props.onCreateClose();
                return data.json();
            }).catch((error) => {
                console.log("e", error);
            });
        }
        setValues({});
    }

    const onFileChange = () => {
        const selectedfile = document.getElementById('avatar').files;
        if (selectedfile.length > 0) {
            const [imageFile] = selectedfile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                setFile(srcData);
            };
            fileReader.readAsDataURL(imageFile);
        }
    }

    const createData = (id) => {
        if (id) {
            console.log({ id: values.id, username: values.name, email: values.email, phone: values.phone, avatar: file });
            return { id: values.id, username: values.name, email: values.email, phone: values.phone, avatar: file };
        } else {
            console.log({ username: values.name, email: values.email, phone: values.phone, avatar: file });
            return { username: values.name, email: values.email, phone: values.phone, avatar: file };
        }
    }

    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add a new Employee</h3>
                </div>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card-body create-card">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group label-container">
                                    <label>ID</label>
                                    <input className="form-control input-field" defaultValue={props.userData?.id}
                                        disabled={true}>
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group label-container">
                                    <label>Name</label>
                                    <input className="form-control input-field" name="name" defaultValue={props.userData?.username}
                                        onChange={onChange} pattern="[A-Za-z0-9 ]{3,20}" required>
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group label-container">
                                    <label>Phone</label>
                                    <input className="form-control input-field" name="phone" defaultValue={props.userData?.phone}
                                        onChange={onChange} pattern="[0-9]{10}" required></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group label-container">
                                    <label>Email</label>
                                    <input className="form-control input-field" name="email" defaultValue={props.userData?.email}
                                        onChange={onChange} type="email" required></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group label-container">
                                    <label>Avatar</label>
                                    <div className="avatar-container">
                                        <input className="form-control input-field" name="avatar"
                                            onChange={onFileChange} type="file" id="avatar"></input>
                                        <img src={props.userData?.avatar}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success" type='submit'>Save</button>
                        <button className="btn btn-info" onClick={props.onCreateClose}>Close</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EmployeeModal;