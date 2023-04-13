import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './EmpListing.css';
const Emplisting = () => {
    const [empData, empdatachange] = useState(null);
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
        if (window.confirm('Do you want to remove?')) {
            console.log("Id ", id);
            fetch("http://localhost:3030/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    return <div className="container">
        <div className="card">
            <div className="card-title">
                <h2>Employees Directory</h2>
            </div>
            <div className="card-body">
                <div>
                    <Link className="btn btn-success add-btn" to='../employee/create'> Add New +
                    </Link>
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
                                        <Link className="btn btn-danger"
                                            onClick={() => { removeUser(item.id) }}>Remove</Link>
                                        <Link className="btn btn-success" to='employee/edit'>Edit</Link>
                                        <Link className="btn btn-info" to='/'>Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default Emplisting;