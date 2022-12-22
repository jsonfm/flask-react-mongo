import { Link } from "react-router-dom";


export const Header = () => {
    return(
    <nav className="navbar navbar-expand-lg bg-light container">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Flask React</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" >About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}