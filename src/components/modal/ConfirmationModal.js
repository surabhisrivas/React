import './EmployeeModal.css';

const ConfirmModal = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">{props.title}</h3>
                </div>
                <div className="modal-body">
                    {props.message}
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={props.onConfirmClose(true)}>Ok</button>
                    <button className="btn btn-danger" onClick={props.onConfirmClose(false)}>Cancel</button>
                </div>
            </div >
        </div>
    )
}

export default ConfirmModal;