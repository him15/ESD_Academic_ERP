import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const getCourseById = (id) => api.get(`/courses/get-course/${id}`);
export const updateCourse = (id, courseData) => api.put(`/courses/update-course/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/delete-course/${id}`);
