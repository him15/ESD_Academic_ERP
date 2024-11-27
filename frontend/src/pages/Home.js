import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [courseId, setCourseId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!/^[1-9][0-9]*$/.test(courseId)) {
      alert('Please enter a valid Course ID.');
      return;
    }

    navigate(`/course/${courseId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="home">
      <h1>Welcome to Course Management</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
