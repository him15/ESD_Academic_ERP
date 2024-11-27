import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import UpdateCourse from './pages/UpdateCourse';
import Login from './pages/Login';
import ProtectedRoute from './comps/ProtectedRoute';
import './styles.css';
const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsAuthenticated(!!token); // Update state based on token
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* Home Page */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          } 
        />

        {/* Course Details */}
        <Route 
          path="/course/:id" 
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          } 
        />

        {/* Update Course */}
        <Route 
          path="/course/update/:id" 
          element={
            <ProtectedRoute>
              <UpdateCourse />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

// Mount React application
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found! Check your public/index.html.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<Index />);
