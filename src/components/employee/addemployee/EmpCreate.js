import { Link, useNavigate } from 'react-router-dom';
import './EmpCreate.css';
import { useState } from 'react';
const EmpCreate = () => {
    const [id, idchange] = useState('');
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [phone, phonechange] = useState('');
    const navigate = useNavigate();
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
            navigate('/employee/list');
            return data.json();
        }).catch((error) => {
            console.log("e", error);
        })
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card form-card">
                            <div className="card-title">
                                <h4>Adding an Employee</h4>
                            </div>
                            <div className="card-body create-card">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input className="form-control create-inputs" value={id} disabled="disabled"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input className="form-control create-inputs" value={name} onChange={e => namechange(e.target.value)}
                                                onMouseUp={e => valChange(true)}>
                                            </input>
                                            {name.length == 0 && validation && <span className='text-danger'>Enter name!</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input className="form-control create-inputs" value={phone}
                                                onChange={e => phonechange(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control create-inputs" value={email}
                                                onChange={e => emailchange(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group btn-div">
                                            <button className='btn btn-success' type='submit'>
                                                Submit
                                            </button>
                                            <Link to='/employee/list' className='btn btn-danger'>Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmpCreate;