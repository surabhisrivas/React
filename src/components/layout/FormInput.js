import './FormInput.css'

const FormInput = (props) => {
    const { onChange, id, errorMessage, ...inputProps } = props;
    return (
        <div className="col-lg-12">
            <div className="form-group">
                <input className="form-control inputs" {...inputProps}
                    onChange={onChange}></input>
                <span className="error-msg">{errorMessage}</span>
            </div>
        </div>
    )
}

export default FormInput;