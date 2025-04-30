import React from "react";

const Users = () => {
  // Dummy users data (you can fetch this from your backend later)
  const users = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      role: "Customer",
      status: "Active",
      joined: "2024-12-15",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "Customer",
      status: "Inactive",
      joined: "2025-01-20",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
      joined: "2023-06-10",
    },
  ];

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
                key={user.id}
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
