import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import { AuthProvider } from './components/AuthContext';
import CourseDetails from './components/CourseDetails';
import CourseList from './components/CourseList';
import Login from './components/Login';
import getCourses from './service/getCourses';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#172808',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function AppContent() {
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      if (data) {
        setCourses(data);
      }
    };
    fetchCourses();
  }, []);

  // Detect route changes and log when the user navigates to the home page
  useEffect(() => {
    if (location.pathname === '/coursehub') {
      console.log('User moved to the home page');
      document.title = 'CourseHub';
    }
  }, [location]);

  return (
    <>
      <Appbar courses={courses} />
      <div style={{ marginTop: 20, margin: 10 }}>
        <Routes>
          <Route path="/coursehub" element={<CourseList courses={courses} />} />
          <Route path="/coursehub/:courseNumber" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
