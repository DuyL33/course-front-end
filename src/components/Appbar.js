import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCourse from '../service/getCourse';
import { useAuth } from './AuthContext';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40%',
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '70%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export default function Appbar({ courses }) {
  const { loggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const navigate = useNavigate();
  const handleCourseClick = async (courseNumber) => {
    await getCourse(courseNumber);
    navigate(`/coursehub/${courseNumber}`);

  };





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button href="/coursehub" color="white">Course Hub</Button>

          <Search>
            <StyledAutocomplete
              freeSolo
              options={courses.map((option) => option.number + " " + option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for courses"
                />
              )}
              onChange={(event, value) => {
                if (value != null){
                  const courseNumber = value.split(" ")[0];
                  if (courseNumber) {
                    handleCourseClick(courseNumber);
                  }
                }
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {loggedIn ? (
              <>
                <Button variant="outlined" size="small" color="white" onClick={handleLogout}>
                  Log Out
                  </Button>
              </>
            ) : (
                <Link to="/login" >
                  <Button variant="outlined" size="small" color="white">
                    Log In
                  </Button>
                </Link>
              )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

