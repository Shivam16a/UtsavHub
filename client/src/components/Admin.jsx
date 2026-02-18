import { NavLink, Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* Sidebar */}
                <div className="col-12 col-md-3 col-lg-2 bg-dark text-white p-3">
                    <h4 className="text-center mb-4">
                        <i className="fa-solid fa-user-shield me-2"></i>
                        Admin Panel
                    </h4>

                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                to="users"
                                className="nav-link text-white"
                            >
                                <i className="fa-solid fa-users me-2"></i>
                                Manage Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="alleventorganizer" className="nav-link text-white">
                                <i className="fas fa-sitemap me-2"></i>
                                All Event Organizer
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-12 col-md-9 col-lg-10 p-4 bg-light">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Admin
