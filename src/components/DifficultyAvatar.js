import Avatar from '@mui/material/Avatar';
import React from 'react';

// Function to get the color based on difficulty
const getDifficultyColor = (difficulty) => {
    if (difficulty >= 1 && difficulty < 1.5) {
      return '#4CAF50'; // Green
    } else if (difficulty >= 1.5 && difficulty < 2.5) {
      return '#8BC34A'; // Light Green
    } else if (difficulty >= 2.5 && difficulty < 3.5) {
      return '#FFEB3B'; // Yellow
    } else if (difficulty >= 3.5 && difficulty < 4.5) {
      return '#FF9800'; // Orange
    } else if (difficulty >= 4.5 && difficulty <= 5) {
      return '#F44336'; // Red
    } else {
      return '#E0E0E0'; // Grey for invalid or undefined difficulty
    }
  };
  

const DifficultyAvatar = ({ difficulty, size=65 }) => {
  const color = getDifficultyColor(difficulty);

  return (
    <Avatar style={{
         color: 'black',
         backgroundColor: color,
         width: size,
         height: size, 
         fontStretch: 'expanded',
         fontWeight: 'bold',
         borderRadius: '1rem'
        }}
        variant="square"
        >
      {difficulty}
    </Avatar>
  );
};

export default DifficultyAvatar;
