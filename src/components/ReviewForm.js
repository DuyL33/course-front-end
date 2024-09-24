import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { default as React, useState } from 'react';
import handleSubmitReview from '../service/handleReviewSubmit';
import CustomSlider from '../util/CustomSlider';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(5),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ReviewForm( {course, getCourse, setCourse, courseNumber, averageDiff, setAverageDiff, getAvgDifficulty}) {
    const submitReview = async () => {
        await handleSubmitReview(newReview);
        const updatedCourse = await getCourse(courseNumber);
        const avg = await getAvgDifficulty(courseNumber);

        setCourse(updatedCourse);
        setAverageDiff(avg);
        setOpen(false);
    
      };
    const [newReview, setNewReview] = useState({
        grade: '',
        professor: '',
        semester:'',
        year:'',
        difficulty: '',
        courseWork:'',
        body: '',
        number: ''
      });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add a Review
      </Button>
      <StyledDialog
        fullWidth={'sm'}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Review: {course.number + " " + course.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 9,
            top: 9,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

        
        <Stack spacing={1}>
                <Typography variant="subtitle2" gutterBottom>
                  What year did you take this class?
                </Typography>
                <TextField
                 fullWidth
                 label="Year"
                 onChange={(e) => setNewReview({ ...newReview, year: e.target.value, number: course.number })}
                />
                <Typography variant="subtitle2" gutterBottom>
                  Which semester did you tkae this class? 
                </Typography>
                <Select
                  style={{ width: '100%' }}
                  value={newReview.semester || ''}
                  onChange={(e) => setNewReview({ ...newReview, semester: e.target.value, number: course.number })}
                >
                  <MenuItem value={"Fall"}>Fall</MenuItem>
                  <MenuItem value={"Spring"}>Spring</MenuItem>
                  <MenuItem value={"Summer"}>Summer</MenuItem>
                </Select>
                <Typography variant="subtitle2" gutterBottom>
                  Who was your professor?
                </Typography>
                <TextField
                 fullWidth
                 label="Semester"
                 onChange={(e) => setNewReview({ ...newReview, professor: e.target.value, number: course.number })}
                />


                <Typography variant="subtitle2" gutterBottom>
                  What was your grade?
                </Typography>
                <Select
                  style={{ width: '100%' }}
                  value={newReview.grade || ''}
                  onChange={(e) => setNewReview({ ...newReview, grade: e.target.value, number: course.number })}
                >
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

                <Typography variant="subtitle2" gutterBottom>
                  How difficult was this course?
                </Typography>
                <CustomSlider
                  value={newReview.difficulty || 0}
                  onChange={(e, newValue) => setNewReview({ ...newReview, difficulty: newValue, number: course.number })}
                />
                <Typography variant="subtitle2" gutterBottom>
                  How much course work was it?
                </Typography>
                <CustomSlider
                  value={newReview.courseWork || 0}
                  onChange={(e, newValue) => setNewReview({ ...newReview, courseWork: newValue, number: course.number })}
                />

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
            </Stack>
            </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitReview}>
            Submit
          </Button>
        </DialogActions>
        </StyledDialog>
    </React.Fragment>
  );
}
