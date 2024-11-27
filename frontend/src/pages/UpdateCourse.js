import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, updateCourse } from '../services/api';

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: '',
    courseCode: '',
    description: '',
    year: '',
    term: '',
    faculty: '',
    credits: '',
    capacity: ''
  });

  useEffect(() => {
    getCourseById(id)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error(error)); // Handle fetch errors
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(id, course)
      .then(() => navigate(`/course/${id}`))
      .catch((error) => console.error(error)); // Handle update errors
  };

  return (
    <form className="update-course" onSubmit={handleSubmit}>
      <h1>Update Course</h1>
      <input name="name" value={course.name} onChange={handleChange} placeholder="Name" required />
      <input name="courseCode" value={course.courseCode} onChange={handleChange} placeholder="Code" required />
      <textarea name="description" value={course.description} onChange={handleChange} placeholder="Description" required />
      <input name="year" value={course.year} onChange={handleChange} placeholder="Year" required />
      <input name="term" value={course.term} onChange={handleChange} placeholder="Term" required />
      <input name="faculty" value={course.faculty} onChange={handleChange} placeholder="Faculty" required />
      <input name="credits" value={course.credits} onChange={handleChange} placeholder="Credits" required />
      <input name="capacity" value={course.capacity} onChange={handleChange} placeholder="Capacity" required />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/')}>Back to Home</button>
    </form>
  );
};

export default UpdateCourse;
