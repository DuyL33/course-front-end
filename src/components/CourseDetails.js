import { Button, Grid, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getAvgDifficulty from '../service/getAvgDifficulty';
import getCourse from '../service/getCourse';
import handleDeleteReview from '../service/handleReviewDelete';
import formatDate from '../util/dateFormat';
import DifficultyAvatar from '../util/DifficultyAvatar';
import reverseReviews from '../util/reverseReviews';
import { useAuth } from './AuthContext';
import ReviewForm from './ReviewForm';
const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [averageDiff, setAverageDiff] = useState(null);
  const { roles } = useAuth();
  console.log(roles);
  const { courseNumber } = useParams();

  // Fetch course data and change page title.
  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse(courseNumber);
      const avg = await getAvgDifficulty(courseNumber);

      setCourse(data);
      setAverageDiff(avg);
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
    <>
      <Grid container

        sx={{
          marginBottom: '1%',
          marginLeft: '1%'
        }}
      >
        <Grid item xs={8} md={11}>
          <Typography variant="h4" gutterBottom>
            {course.number} - {course.name}
          </Typography>
        </Grid>
        <Grid item xs={false} md={1} style={{ textAlign: 'left' }}>
          <DifficultyAvatar difficulty={averageDiff} />
        </Grid>
      </Grid>



      <Stack spacing={2}
        sx={{
          marginBottom: '1%',
          marginLeft: '1%'
        }}
      >
        {reverseReviews(course.review_ids).map((review, index) => (
          <Paper key={index} className="review-item" elevation={5}
            sx={{
              borderRadius: '1rem', padding: 1, width: '70%',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}>
            <Grid container>


              <Grid item xs={1} md={1}>

                <Typography style={{ fontSize: '0.5rem', fontWeight: 'bold' }} variant="caption" gutterBottom>
                  DIFFICULTY
                      </Typography>
                <DifficultyAvatar difficulty={parseInt(review.difficulty, 10)} size={42} />

                <Typography style={{ fontSize: '0.5rem', fontWeight: 'bold' }} variant="caption" gutterBottom>
                  WORK
                      </Typography>
                <DifficultyAvatar difficulty={parseInt(review.courseWork, 10)} size={42} />

              </Grid>
              <Grid item xs={2} md={2}>
                <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
                  Grade: {review.grade}
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
                  Prof. {review.professor}
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
                  {review.semester} {review.year}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {formatDate(review.created)}
                </Typography>
              </Grid>

              <Grid item xs={5} md={5} sx={{ textAlign: 'left' }}>
                <Typography variant="body2" gutterBottom>
                  {review.body}
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

      <ReviewForm course={course}
        getCourse={getCourse}
        setCourse={setCourse}
        courseNumber={courseNumber}
        averageDiff={averageDiff}
        setAverageDiff={setAverageDiff}
        getAvgDifficulty={getAvgDifficulty}
      ></ReviewForm>

    </>

  );
};

export default CourseDetail;
