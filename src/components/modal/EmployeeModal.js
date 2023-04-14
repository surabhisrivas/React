import React from "react";
import { useState } from 'react';
import './EmployeeModal.css';

const EmployeeModal = (props) => {
    const [id, idchange] = useState('');
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [phone, phonechange] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [validation, valChange] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const empData = { name, email, phone };
        fetch('http://localhost:3030/employee', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empData)
        }).then((data) => {
            alert("Saved Successfully :)");
            props.onCreateClose();
            return data.json();
        }).catch((error) => {
            console.log("e", error);
        })
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
                                <div className="form-group">
                                    <label>ID</label>
                                    <input className="form-control input-field" value={id} disabled={!(props.userData?.id) ? true : false}></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control input-field" value={name} onChange={e => namechange(e.target.value)}
                                        onMouseUp={e => valChange(true)}>
                                    </input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input className="form-control input-field" value={phone}
                                        onChange={e => phonechange(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control input-field" value={email}
                                        onChange={e => emailchange(e.target.value)}></input>
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
        </div>
    )
}

export default EmployeeModal;