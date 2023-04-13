import { useNavigate } from "react-router-dom";
import FormInput from "../layout/FormInput";
import './Registration.css';
import { useState } from "react";

function Registration() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "User name must have 3 alphabets!",
            pattern: '^[a-zA-Z0-9]{3,16}'
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Enter valid email address!",
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "Password must have atleast 8 characters (one lowercase, one uppercase, one number and a special character is required)!",
            pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$`
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Must match with Password!",
            pattern: values.password
        }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        navigate('/employee/list');
    }
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    return (<div>
        <div className="container bgimage">
            <div className="offset-lg-3 col-lg-6 form-container">
                <div className="card">
                    <div className="card-title">
                        <h4> Sign Up to access directory!</h4>
                    </div>
                    <div className="card-body">
                        <div className="app">
                            <form onSubmit={handleSubmit}>
                                {inputs && inputs.map((input) => (
                                    <FormInput key={input.id} {...input} values={values[input.name]} onChange={onChange}></FormInput>
                                ))}
                                <button className="btn btn-info submit-btn" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Registration;