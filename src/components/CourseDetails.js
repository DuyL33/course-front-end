import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { default as React, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/Api';
import { useAuth } from './AuthContext';
import CustomSlider from './CustomSlider';
import DifficultyAvatar from './DifficultyAvatar';

const CourseDetail = ({ course, getCourse }) => {
  const [newReview, setNewReview] = useState({
    grade: '',
    difficulty: '',
    body: '',
    number: ''
  });
  // Fetch course details on component mount



  
  const { roles } = useAuth();
  console.log(roles);
  const handleReviewSubmit = async () => {
    try {
      // Send the new review data to the server
      await api.post(`https://cs-gmu-courses.onrender.com/CS/Courses/Review`, newReview);
      // After submitting the review, fetch the updated course details
      getCourse(course.number);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteReview = async (createdTime) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`https://cs-gmu-courses.onrender.com/CS/Courses/Review/${encodeURIComponent(createdTime)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      // After deleting the review, fetch the updated course details
      getCourse(course.number);
      // Handle successful deletion
      console.log('Review deleted successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  const avgDifficulty = (course) => {
    if (!course || !course.review_ids || course.review_ids.length === 0) {
      return 0;
    }

    const totalDifficulty = course.review_ids.reduce((total, review) => {
      return total + parseInt(review.difficulty);
    }, 0);

    return (totalDifficulty / course.review_ids.length).toFixed(1);
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!course) {
    return (
      <Card variant="outlined" sx={{ margin: '10px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Loading course details...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const sortedReviews = [...course.review_ids].sort((a, b) => new Date(b.created) - new Date(a.created));

  const reviewsPerPage = 5;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (

    <Card variant="outlined" sx={{ margin: '10px' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8} md={11}>
            <Typography variant="h4" gutterBottom>
              {course.number} - {course.name}
            </Typography>
          </Grid>
          <Grid item xs={false} md={1} style={{ textAlign: 'left' }}>

            <DifficultyAvatar difficulty={(avgDifficulty(course))} />

          </Grid>
        </Grid>

        <Grid container spacing={10}>
          <Grid item xs={4} md={8}>

            <Stack spacing={2}>
              {currentReviews.map((review, index) => (
                <Paper key={index} className="review-item" elevation={5} sx={{ borderRadius: '1rem', padding: 1, width: '100%' }}>
                  <Grid container spacing={5}>

                    <Grid item xs={1} md={1}>
                      <Typography style={{ fontSize: '0.6rem', fontWeight: 'bold' }} variant="caption" gutterBottom>
                        DIFFICULTY
                    </Typography>
                      <DifficultyAvatar difficulty={parseInt(review.difficulty, 10)} size={45} />
                    </Grid>
                    <Grid item xs={9} md={9}>
                      <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
                        Grade: {review.grade}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {review.body}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold' }}>
                        {formatDate(review.created)}
                      </Typography>
                    </Grid>

                  </Grid>

                  {roles && roles.includes('ROLE_ADMIN') && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteReview(review.created)}
                    >
                      Delete
                    </Button>
                  )}

                </Paper>
              ))}
              <Pagination
                count={Math.ceil(course.review_ids.length / reviewsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            </Stack>
          </Grid>
          <Grid item xs={false} md={4}>
            <Stack spacing={2}>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ borderRadius:'1rem', width: '90%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  What was your grade?
                </Typography>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select style={{ width: '100%' }}
                  label="Grade"
                  value={newReview.grade || ''}
                  onChange={(e) => setNewReview({ ...newReview, grade: e.target.value, number: course.number })}>
                  <MenuItem value={"A+"}>A+</MenuItem>
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"A-"}>A-</MenuItem>
                  <MenuItem value={"B+"}>B+</MenuItem>
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"B-"}>B-</MenuItem>
                  <MenuItem value={"C+"}>C+</MenuItem>
                  <MenuItem value={"C"}>C</MenuItem>
                  <MenuItem value={"C-"}>C-</MenuItem>
                  <MenuItem value={"D+"}>D+</MenuItem>
                  <MenuItem value={"D"}>D</MenuItem>
                  <MenuItem value={"D-"}>D-</MenuItem>
                  <MenuItem value={"F"}>F</MenuItem>

                </Select>
              </Paper>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ borderRadius:'1rem', width: '90%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  How difficult was this course?
          </Typography>
                <CustomSlider
                  value={newReview.difficulty || 0}
                  onChange={(e, newValue) => setNewReview({ ...newReview, difficulty: newValue, number: course.number })}
                />
              </Paper>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ borderRadius:'1rem', width: '90%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Write a review
          </Typography>
                <TextField
                  id="filled-multiline-static"
                  label="Comment"
                  multiline
                  rows={4}
                  variant="filled"
                  value={newReview.body}
                  onChange={(e) => setNewReview({ ...newReview, body: e.target.value, number: course.number })}
                  style={{ width: '100%' }}
                />
              </Paper>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ borderRadius:'1rem', width: '90%' }}>
                <Button variant="contained" color="success" onClick={handleReviewSubmit} style={{ marginLeft: 'auto', marginRight: 'auto', width: '40%', display: 'block' }}>
                  Submit Review
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>


        <Link to="/coursehub" className="back-link">
          Back to Courses
      </Link>

      </CardContent>

    </Card>
  );
};

export default CourseDetail;
