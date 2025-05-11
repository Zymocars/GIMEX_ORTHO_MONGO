import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}api/admin/getallusers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token here
            },
        });

        if (response.status === 304) {
            console.log('Using cached data');
            return; // Exit early if no new data is available
        }

        const data = await response.json();
        console.log('Users fetched successfully:', data);
        setUsers(data.data); // Update the users state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">User Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-gray-300">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {users.map((user, index) => (
              <tr
                key={user.id || index} // Use user.id if available, otherwise fallback to index
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
