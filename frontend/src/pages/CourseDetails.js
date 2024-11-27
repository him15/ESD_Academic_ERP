import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, deleteCourse } from '../services/api';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById(id)
      .then((response) => setCourse(response.data))
      .catch(() => {
        alert('Course not found');
        navigate('/'); // Redirect back to home page
      });
  }, [id, navigate]);

  const handleDelete = () => {
    deleteCourse(id)
      .then(() => navigate('/'))
      .catch((error) => console.error(error)); // Handle deletion errors
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-details">
      <h1>{course.name}</h1>
      <p><strong>Code:</strong> {course.courseCode}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Prerequisite:&nbsp;&nbsp;</strong> 
      <ul>
          {course.prerequisites.map((item)=><li>{item.prerequisite.courseCode}</li>)}
          </ul>
      </p>
      <button onClick={() => navigate(`/course/update/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default CourseDetails;
