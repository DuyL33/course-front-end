import { Card, CardContent, Typography } from '@mui/material'; // Import Card components from Material-UI
import { default as React, useEffect, useState } from 'react';
import getAvgDifficulty from '../service/getAvgDifficulty';
import DifficultyAvatar from '../util/DifficultyAvatar';



const CourseCard = ({ course }) => {
  const [averageDiff, setAverageDiff] = useState(null);

  useEffect(() => {
    const fetchAvg = async () => {
      const avg = await getAvgDifficulty(course.number);

      setAverageDiff(avg);
    };
    fetchAvg();
  }, [course]);
  
  return (
    <Card 
    elevation={3}
    style={{
      height: '100%' ,
      textAlign: 'left',
      borderRadius: '1rem'
    }}>
      <CardContent>
        <Typography variant="h5" style={{ textDecoration: 'none' }}>{course.number}</Typography>
        <Typography variant="subtitle1" style={{ textDecoration: 'none' }}>{course.name}</Typography>
        <Typography variant="body2" style={{ textDecoration: 'none' }}>Credit: {course.credit}</Typography>
        <Typography style={{ fontSize: '0.5rem', fontWeight: 'bold' }} variant="caption" gutterBottom>
          DIFFICULTY
        </Typography>
        <DifficultyAvatar difficulty={averageDiff} size={42} />
      </CardContent>
    </Card>
  );
};

export default CourseCard