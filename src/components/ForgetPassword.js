import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgetPassword() {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [dailogContent, setDailogContent] = useState("");
  const [dailogTitle, setDailogTitle] = useState("");
  const [open2, setOpen2] = useState(false);

  const handleChange = (event) => {
    const target_name = event.target.name;
    const target_value = event.target.value;
    
    const valid = event.target.checkValidity();

    if(target_name === 'password') {

      if (valid === true) {
        setPassword(target_value);
        // setValue({password: target_value});
      }
    }else if(target_name === 'confirmpassword') {

      if (valid === true) {
        setConfirmPassword(target_value);
        // setValue({password: target_value});
      }
    }else if(target_name === 'email'){
      if (valid === true) {
        setEmail(target_value);
        // setValue({password: target_value});
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, confirmpassword);

    if ( password !== confirmpassword ) {
      // Raise a dailog
      setDailogTitle("Password Mismatch");
      setDailogContent('Password and Confirm Password does not match')
      setOpen(true);
    }else {
      
      fetch('http://localhost:8081/api/user/changePassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email, password})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          // Navigate to Sign in
          setDailogTitle("Password Change Successfully");
          setDailogContent('')
          setOpen2(true);
          // alert('Password Changed Successfully');    
        }else {
          // Dailog for Password Change Failed
          setDailogTitle("Password Change Failed");
          setDailogContent('Invalid Email or Password entered')
          setOpen(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setRedirect(true);
  };

  if(redirect) {
    return <Redirect to={'/'} />
  }else {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Change
        </Typography>
        <form className={classes.form} method="POST" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                onBlur = {handleChange} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                type="password"
                onBlur = {handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="confirm-password"
                onBlur = {handleChange} 
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change
          </Button>
          <Dailog open = {open} title = {dailogTitle} content = {dailogContent} handleClose = {handleClose}/>  
          <Dailog open = {open2} title = {dailogTitle} content = {dailogContent} handleClose = {handleClose2}/>   
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}
