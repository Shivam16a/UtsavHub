import { NavLink,Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <>
            <div> <p>Admin</p>

            <Outlet/>
            </div>
        </>
    )
}

export default Admin