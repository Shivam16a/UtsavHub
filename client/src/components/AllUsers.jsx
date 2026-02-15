import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

const AllUsers = () => {

  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      let url = "http://localhost:5650/api/users/all";

      // 🔥 Agar query present hai, to search route call karo
      if (query) {
        url = `http://localhost:5650/api/users/search?query=${query}`;
      }

      const response = await fetch(url, { method: "GET", credentials: "include" });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query]); 
  

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(
        `http://localhost:5650/api/users/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      )

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      fetchUsers()

    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  // ================= UPDATE USER =================
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5650/api/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: editingUser.username,
            email: editingUser.email
          })
        }
      )

      if (!response.ok) {
        throw new Error("Update failed")
      }

      setEditingUser(null)
      fetchUsers()

    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <div className="container-fluid">

      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fa-solid fa-users me-2"></i>
            All Users
          </h5>
        </div>

        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>PRN</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.prn}</td>
                    <td className="text-center">

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => setEditingUser(user)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fa-solid fa-user-pen me-2"></i>
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, username: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>

              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleUpdate}
                >
                  <i className="fa-solid fa-floppy-disk me-2"></i>
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AllUsers
