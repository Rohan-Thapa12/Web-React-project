import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LMSProvider } from './LMSContext';
import Auth from './Auth';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import CoursePlayer from './CoursePlayer'; // Fixed missing import

export default function App() {
  return (
    <LMSProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/course-player/:id" element={<CoursePlayer />} />
        </Routes>
      </Router>
    </LMSProvider>
  );
}