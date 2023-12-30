import { Card, CardContent, Typography } from '@material-ui/core'; // Import Card components from Material-UI
import React from 'react';
const CourseCard = ({ course }) => {
  return (
    <Card className='styles.cardContainer'>
      <CardContent>
        <Typography variant="h6">{course.number}</Typography>
        <Typography variant="subtitle1">{course.name}</Typography>
        <Typography variant="body2">Credit: {course.credit}</Typography>
        {/* Add more details as needed */}
      </CardContent>
    </Card>
  );
};

export default CourseCard