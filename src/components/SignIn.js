import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import {useState} from 'react';
import image from '../assets/images/bookdisplay.jpg';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../actions';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import Dailog from './Dailog';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [dailogContent, setDailogContent] = useState("");
  const [dailogTitle, setDailogTitle] = useState("");
  
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    
    let sessionObj = sessionStorage.getItem('sessionObject');
    let cacheObj = localStorage.getItem('cacheObject');
  
    if(sessionObj) {
      sessionObj = JSON.parse(sessionStorage.getItem('sessionObject'));
      var session_cur_date = new Date();
      var session_expirationDate = sessionObj.expiresAt;
      if(Date.parse(session_expirationDate) > Date.parse(session_cur_date)){
        setStatus(true);
      }else {
        sessionStorage.removeItem('sessionObject');
      }
    } else if(cacheObj) {
      cacheObj = JSON.parse(localStorage.getItem('cacheObject'));
      var cache_cur_date = new Date();
      var cache_expirationDate = cacheObj.expiresAt;
      if(Date.parse(cache_expirationDate) > Date.parse(cache_cur_date)){
        setStatus(true);
      } else {
        localStorage.removeItem('cacheObject');
      } 
    }
  });

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    const target_name = event.target.name;
    const target_value = event.target.value;
    
    const valid = event.target.checkValidity();

    if(target_name === 'email') {
      if (valid === true) {
        setEmail(target_value);
      }
    }else if(target_name === 'password') {
      if (valid === true) {
        setPassword(target_value);
      }
    } 
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);

    fetch('http://localhost:8081/api/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'    
      },
      body:JSON.stringify({email, password})
    })
    .then(resp => resp.json())
    .then(resp => {
      // console.log(resp);
      if (resp.message === 'success'){
        // Update context
        console.log(auth);
        dispatch(login(resp.email));
        // Session / Cache storage if Remember me
        const curr = new Date();
        let expireDuration = 1800;
        let expirationDate = new Date(curr.getTime() + expireDuration * 1000);
        const sessionObject = {
          expiresAt: expirationDate,
          email: resp.email
        };
        sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
        if(checked) {
          expireDuration = 1000000;
          expirationDate = new Date(curr.getTime() + expireDuration * 1000);
          const cacheObject = {
            expiresAt: expirationDate,
            email: resp.email
          }
          localStorage.setItem('cacheObject', JSON.stringify(cacheObject))
        }
        // Redirect to Dashboard
        setRedirect(true);

        console.log(resp);
      }else {
        // display error message
        setDailogTitle("Login Failed");
        setDailogContent('Invalid Email or Password')
        setOpen(true);
      }
    })
    .catch(err => {
      
      setOpen(true);
    });

  }

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  }

  if (redirect || status) {
    return <Redirect to={'/search'} />
  }else{
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className= {classes.image} />  
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} method="POST">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onBlur = {handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur = {handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked = {checked} onChange = {handleCheck}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Dailog open = {open} title = {dailogTitle} content = {dailogContent} handleClose = {handleClose}/>       
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
              <IconButton>
               <FacebookIcon color="primary" />
              </IconButton>

              <IconButton>
               <InstagramIcon color="secondary" />
              </IconButton>

              <IconButton>
               <MailIcon color="primary" />
              </IconButton>
              </Grid>
              <Grid item xs>
             
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  }
}
