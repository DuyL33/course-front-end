import AccountCircle from '@mui/icons-material/AccountCircle'; // Import your icon
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to="/coursehub" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}
            >
              CourseHub
            </Typography>
          </Link>


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
                <IconButton size="large" edge="end" aria-label="account of current user" color="inherit">
                  <AccountCircle />
                </IconButton>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
                <Link to="/login" style={{ color: 'white' }}>
                  <Typography variant="h6" noWrap component="div">
                    Log In
                </Typography>
                </Link>
              )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

