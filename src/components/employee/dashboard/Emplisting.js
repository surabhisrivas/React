import { useEffect, useState } from "react";
import './EmpListing.css';
import EmployeeModal from "../../modal/EmployeeModal";
import { FaTrash, FaPen } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Emplisting = () => {

    const [empData, empDataChange] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3030/employee').then((data) => {
            return data.json();
        }).then((users) => {
            empDataChange(users);
        }).catch((error) => {
            console.log("e", error);
        })
    });

    const removeUser = (id) => {
        fetch("http://localhost:3030/employee/" + id, {
            method: "DELETE"
        }).then(() => {
            toast.warn('Removed Successfully');
        }).catch((err) => {
            console.log(err.message);
        })
    }

    // setting the value of user to be edited
    const editUser = (user) => {
        setEditData(user);
        setShowDialog(true);
    }

    // setting the value of user to be edited to null
    const closeDialog = () => {
        setEditData(null);
        setShowDialog(false);
    }

    return <div className="container emp-list-container">
        <div className="card">
            <div className="card-title-area">
                <h2>Employees Directory</h2>
                <div className="button-actions">
                    <button className="btn btn-success add-btn" onClick={() => setShowDialog(true)}>Add +</button>
                    <EmployeeModal onCreateClose={() => closeDialog()} show={showDialog} userData={editData}></EmployeeModal>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead className="bg-dark text-white">
                        <tr>
                            <td>Avatar</td>
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
                                    <td><img src={item.avatar} className="image"></img></td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td className="form-buttons">
                                        <FaPen onClick={() => editUser(item)} className="icons edit-icon"></FaPen>
                                        <FaTrash onClick={() => removeUser(item.id)} className="icons delete-icon"></FaTrash>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </div >
}

export default Emplisting;