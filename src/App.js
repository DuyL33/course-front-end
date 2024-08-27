import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import CourseDetail from './components/CourseDetails';
import CourseList from './components/CourseList';
import api from './service/Api';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#172808', // Adjust the color shade as needed
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
      <div className="App">
      
        <BrowserRouter>
        <Appbar courses={courses} getCourse={getCourse} />
          <div>
            {/* Link the "Courses" header to the home page */}
            <Link to="/course-front-end">
              <h1>Courses</h1>
            </Link>
            
            <Routes>
              
              <Route path="/course-front-end" element={<CourseList getCourse={getCourse} courses={courses} />} />
              <Route path="/courses/:courseNumber" element={<CourseDetail getCourse={getCourse} course={course} />} />
            </Routes>
          </div>
        </BrowserRouter>

      </div>
    </ThemeProvider>
  );
}

export default App;
