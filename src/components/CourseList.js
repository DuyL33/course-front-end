// CourseList.js
import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

const CourseList = ({ courses, getCourse }) => {
    const handleCourseClick = async (courseNumber) => {
        await getCourse(courseNumber);
        };
  return (
    <Grid container spacing={2}>
      {courses.map((course, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ height: '200px' }}>
          <Link to={`/courses/${course.number}` } onClick={() => handleCourseClick(course.number)}> {/* Update to include Link */}
            <CourseCard course={course} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
