function NavBar() {
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark navigation-container">
                <a className="navbar-brand" href='/employee/list'>Home</a>
                <a className="navbar-brand" href='/contact'>Contact Us</a>
                <a className="navbar-brand" href='/'>Register</a>
            </div>
        </div>
    )
}

export default NavBar;