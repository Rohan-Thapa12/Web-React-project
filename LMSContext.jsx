import React, { createContext, useState, useContext, useEffect } from 'react';

const LMSContext = createContext();

export const LMSProvider = ({ children }) => {
  // Store Courses
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_courses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Quantum Computing Basics", students: 185, updates: 4 },
      { id: 2, title: "Blockchain Development", students: 42, updates: 2 }
    ];
  });

  // Store Enrollment Requests
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('lms_reqs');
    return saved ? JSON.parse(saved) : [
      { id: 101, studentName: "Priya", courseTitle: "Quantum Computing Basics" },
      { id: 102, studentName: "Raj", courseTitle: "Blockchain Development" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses));
    localStorage.setItem('lms_reqs', JSON.stringify(requests));
  }, [courses, requests]);

  const addCourse = (title) => {
    const newCourse = { id: Date.now(), title, students: 0, updates: 0 };
    setCourses([...courses, newCourse]);
  };

  const approveStudent = (id) => {
    const requestToApprove = requests.find(r => r.id === id);
    if (requestToApprove) {
      setCourses(courses.map(c => 
        c.title === requestToApprove.courseTitle ? { ...c, students: c.students + 1 } : c
      ));
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  const approveAll = () => {
    requests.forEach(req => approveStudent(req.id));
  };

  return (
    <LMSContext.Provider value={{ courses, requests, addCourse, approveStudent, approveAll }}>
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);