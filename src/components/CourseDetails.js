import { Grid } from '@material-ui/core';
import { Avatar, Button, InputLabel, MenuItem, Paper, Select, Slider, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/Api';
import './CourseDetails.css';



const CourseDetail = ({ course, getCourse }) => {
  const [newReview, setNewReview] = useState({
    grade: '',
    difficulty: '',
    body: '',
    number: ''
  });

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
      // Send the delete request to the server using the createdTime directly
      await api.delete(`https://cs-gmu-courses.onrender.com/CS/Courses/Review/${encodeURIComponent(createdTime)}`);

      // After deleting the review, fetch the updated course details
      getCourse(course.number);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
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

  const reviewsPerPage = 5;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = course.review_ids.slice(indexOfFirstReview, indexOfLastReview);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (

    <Card variant="outlined" sx={{ margin: '10px' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8} md={11}>
            <Typography variant="h3" gutterBottom>
              {course.number} - {course.name}
            </Typography>
          </Grid>
          <Grid item xs={0} md={1} style={{ textAlign: 'left' }}>
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 56, height: 56 }}
            >
              9/10
          </Avatar>
          </Grid>
        </Grid>

        {/* <Typography variant="body1" gutterBottom>
          {course.description}
        </Typography> */}
        <Grid container spacing={10}>
          <Grid item xs={4} md={8}>

            <Stack spacing={2}>
              {currentReviews.map((review, index) => (
                <Paper key={index} className="review-item" elevation={5} sx={{ padding: 1, width: '100%' }}>
                  <Grid container spacing={5}>

                  <Grid item xs={1} md={1}>
                    <Typography style={{fontSize:'0.6rem', fontWeight:'bold'}} variant="caption" gutterBottom>
                      DIFFICULTY
                    </Typography>
                    <Avatar style={{margin:'0 auto'}}>{review.difficulty}</Avatar>
                  </Grid>
                  <Grid item xs={9} md={9}>
                    <Typography variant="body1" gutterBottom style={{fontWeight:'bold'}}>
                      Grade: {review.grade}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {review.body}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <Typography variant="body2" gutterBottom style={{fontWeight:'bold'}}>
                      {formatDate(review.created)}
                    </Typography>
                  </Grid>

                  </Grid>

                  


                  {/* <button className="del-btn" onClick={() => handleDeleteReview(review.created)}>Delete</button> */}
                </Paper>
              ))}
              <Pagination
                count={Math.ceil(course.review_ids.length / reviewsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{marginLeft:'auto', marginRight:'auto'}}
              />
            </Stack>
          </Grid>

          <Grid item xs={0} md={4}>
            <Stack spacing={2}>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ width: '90%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  What was your grade?
          </Typography>
                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                <Select style={{ width: '100%' }} label="Grade" onChange={(e) => setNewReview({ ...newReview, grade: e.target.value, number: course.number })}>
                  <MenuItem value={"A+"}>A+</MenuItem>
                  <MenuItem value={"A"}>A</MenuItem>
                  <MenuItem value={"A-"}>A</MenuItem>
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
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ width: '90%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  How difficult was this course?
          </Typography>
                <Slider
                  aria-label="Temperature"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  shiftStep={1}
                  step={0.5}
                  marks
                  min={0}
                  max={5}
                  value={newReview.difficulty}
                  onChange={(e) => setNewReview({ ...newReview, difficulty: e.target.value, number: course.number })}
                  style={{ width: '100%' }}
                />
              </Paper>
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ width: '90%' }}>
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
              <Paper className="review-item" elevation={5} sx={{ padding: 2 }} style={{ width: '90%' }}>
                <Button variant="contained" color="success" onClick={handleReviewSubmit} style={{marginLeft:'auto', marginRight:'auto', width: '40%', display:'block'}}>
                  Submit Review
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>




        <Link to="/course-front-end" className="back-link">
          Back to Courses
      </Link>

      </CardContent>

    </Card>
  );
};

export default CourseDetail;
