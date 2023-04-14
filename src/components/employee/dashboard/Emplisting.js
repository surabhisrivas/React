import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './EmpListing.css';
import EmployeeModal from "../../modal/EmployeeModal";
import ConfirmModal from "../../modal/ConfirmationModal";

const Emplisting = () => {
    const [empData, empdatachange] = useState(null);
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState({ id: 0, show: false });
    const [confirmRemove, setConfirmRemove] = useState(false);
    const [editData, setEditData] = useState(null);
    let removeId = 0;
    useEffect(() => {
        fetch('http://localhost:3030/employee').then((data) => {
            return data.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((error) => {
            console.log("e", error);
        })
    });
    const removeUser = (id) => {
        fetch("http://localhost:3030/employee/" + id, {
            method: "DELETE"
        }).then((res) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const confirmRemoveUser = (remove) => {
        setShowRemove({ id: showRemove.id, show: false });
        if (remove) {
            removeUser(showRemove.id);
        }
    }

    const editUser = (user) => {
        setEditData(user);
        setShow(true);
    }

    return <div className="container emp-list-container">
        <div className="card">
            <div className="card-title">
                <h2>Employees Directory</h2>
            </div>
            <div className="card-body">
                <div className="button-actions">
                    <button className="btn btn-success add-btn" onClick={() => setShow(true)}>Add +</button>
                    <EmployeeModal onCreateClose={() => setShow(false)} show={show} userData={editData}></EmployeeModal>
                    <ConfirmModal onConfirmClose={(remove) => confirmRemoveUser(remove)} show={showRemove.show} title={'Delete User'}
                        message={'Are you sure you want to remove?'} ></ConfirmModal>
                </div>
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {empData &&
                            empData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td className="form-buttons">
                                        <button className="btn btn-danger" onClick={() => setShowRemove({ id: item.id, show: true })}>Remove</button>
                                        <Link className="btn btn-success" onClick={() => editUser(item)}>Edit</Link>
                                        <Link className="btn btn-info" to='/'>Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div >
}

export default Emplisting;