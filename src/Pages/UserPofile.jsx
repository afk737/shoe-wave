import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword.trim() === '') return alert('Password cannot be empty');

    setLoading(true);
    try {
      await updatePassword(newPassword); // ✅ Make sure this is async and updates backend
      alert('Password updated successfully!');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={handlePasswordChange}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
