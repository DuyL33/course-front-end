import { Button, Grid, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { default as React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getCourse from '../service/getCourse';
import handleDeleteReview from '../service/handleReviewDelete';
import { useAuth } from './AuthContext';
import DifficultyAvatar from './DifficultyAvatar';
import ReviewForm from './ReviewForm';
const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { roles } = useAuth();
  console.log(roles);
  const { courseNumber } = useParams();

  // Fetch course data and change page title.
  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse(courseNumber);
      setCourse(data);
      if (data && data.number) {
        document.title = data.number;
      }
    };

    fetchCourse();
  }, [courseNumber]);


  const deleteReview = async (createdTime) => {

    await handleDeleteReview(createdTime);
    const updatedCourse = await getCourse(courseNumber);
    setCourse(updatedCourse);

  }

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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
            <DifficultyAvatar difficulty={avgDifficulty(course)} />
          </Grid>
        </Grid>


            <Stack spacing={2}>
              {course.review_ids.map((review, index) => (
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
                    <Grid item xs={2} md={2} sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" gutterBottom>
                        {formatDate(review.created)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {roles && roles.includes('ROLE_ADMIN') && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteReview(review.created)}
                    >
                      Delete
                    </Button>
                  )}
                </Paper>
              ))}
            </Stack>

            <ReviewForm course={course} getCourse={getCourse} setCourse={setCourse} courseNumber={courseNumber} ></ReviewForm>


        <Link to="/coursehub" className="back-link">
          Back to Courses
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseDetail;
