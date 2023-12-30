  import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import CourseDetail from './components/CourseDetails';
import CourseList from './components/CourseList';
import api from './service/Api';



  function App() {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null);

    const getCourses = async () =>{
      try{
        const response = await api.get('http://localhost:8080/CS/Courses');
        console.log(response.data);
        setCourses(response.data);
      }catch(err){
        console.log(err);
      }
    }
    useEffect(() => {
      getCourses();
    },[])
    
    const getCourse = async(courseNumber) =>{
      try {
        const response = await api.get(`http://localhost:8080/CS/Courses/${courseNumber}`);
        console.log(response.data); // Log the API response
        const singleCourse = response.data;
        setCourse(singleCourse);  
      }catch (err){
        console.error(err);
      }
    }

    return (
      <div className="App">
        <Appbar/>
        <BrowserRouter>

        <div>
        
          <h1>Courses</h1>
          <Routes>
          <Route path="/" element={<CourseList getCourse ={getCourse} courses={courses} />}></Route>
          <Route path="/courses/:courseNumber" element={<CourseDetail getCourse ={getCourse} course ={course}/>} />
          </Routes>
        </div>

      </BrowserRouter>
      </div>

      
    );
  }

  export default App;
