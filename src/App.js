import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import { AuthProvider } from './components/AuthContext';
import CourseDetail from './components/CourseDetails';
import CourseList from './components/CourseList';
import Login from './components/Login';
import api from './service/Api';
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

function App() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);

  const getCourses = async () => {
    try {
      const response = await api.get('https://cs-gmu-courses.onrender.com/CS/Courses');
      console.log(response.data);
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCourses();
  }, [])

  const getCourse = async (courseNumber) => {
    try {
      const response = await api.get(`https://cs-gmu-courses.onrender.com/CS/Courses/${courseNumber}`);
      console.log(response.data); // Log the API response
      const singleCourse = response.data;
      setCourse(singleCourse);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <div className="App">
      
        <BrowserRouter>

        <Appbar courses={courses} getCourse={getCourse} />
          <div style={{marginTop: 20, margin: 10}}>
            
            <Routes>
              <Route path="/coursehub" element={<CourseList getCourse={getCourse} courses={courses} />} />
              <Route path="/courses/:courseNumber" element={<CourseDetail getCourse={getCourse} course={course} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>

      </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
