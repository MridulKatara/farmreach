import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetail from './pages/UserDetail';
import UserList from './pages/UserList';
import EditProfile from './pages/EditProfile';
import AddUser from './pages/AddUser';
import Navbar from './pages/Navbar';

const App = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.languages.toLowerCase().includes(lowerCaseQuery) ||
        user.education.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(results);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} /> 
      <Routes>
        <Route path="/" element={<UserList users={filteredUsers} setUsers={setUsers} />} />
        <Route path="/user-list" element={<UserList users={filteredUsers} setUsers={setUsers} />} />
        <Route path="/user/:email" element={<UserDetail />} />
        <Route path="/edit/:email" element={<EditProfile />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
