import { NavLink,Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <>
            <div> <p>Welcome!</p>
                <NavLink to="users">Users</NavLink>
            <Outlet/>
            </div>
        </>
    )
}

export default Admin