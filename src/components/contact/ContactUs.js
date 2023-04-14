import './Contact.css'

const Contact = () => {
    return (
        <div className="contact-card">
            <h4>Mail us your Query</h4>
            <form>
                <div className="form-input">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email"></input>
                </div>
                <div className="form-input">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Enter your Query'></textarea>
                </div>
                <button className="btn mail-btn">Send</button>
            </form>
        </div>
    )
}

export default Contact;