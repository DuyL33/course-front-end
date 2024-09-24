// CourseList.js
import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import getCourse from '../service/getCourse';
import CourseCard from '../util/CourseCard';

const CourseList = ({ courses }) => {
    const handleCourseClick = async (courseNumber) => {
        await getCourse(courseNumber);
        };
  return (
    <>
    <Grid container spacing={1}>
      <Grid item size={2} 
      sx={{fontWeight:'bold',
      }}
      >

        {courses.length}

      </Grid>
      <Grid item size={2} >

        Computer Science courses

      </Grid>
    </Grid>


    <Grid container spacing={2}>
      {courses.map((course, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}
        sx={{
          height: '200px',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}>
          <Link to={`/coursehub/${course.number}` } onClick={() => handleCourseClick(course.number)}> {/* Update to include Link */}
            <CourseCard course={course} />
          </Link>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default CourseList;
