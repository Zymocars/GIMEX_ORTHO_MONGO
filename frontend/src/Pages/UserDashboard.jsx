import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import PersonalInfo from './PersonalInfo';
// import AccountSettings from './AccountSettings';

export default function Dashboard() {
  const [view, setView] = useState('personal');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <UserSidebar setView={setView} handleLogout={handleLogout} />

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded shadow">
          {view === 'personal' && <PersonalInfo />}
          {view === 'settings' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
