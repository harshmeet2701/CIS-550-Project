import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from 'react';
import { Redirect } from 'react-router-dom';
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

export default function SignUp(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [redirect, setRedirect] = useState(false);

  //For Dailog
  const [open, setOpen] = useState(false);
  const [dailogContent, setDailogContent] = useState("");
  const [dailogTitle, setDailogTitle] = useState("");

  const handleChange = (event) => {
    const target_name = event.target.name;
    const target_value = event.target.value;
    
    const valid = event.target.checkValidity();

    if(target_name === 'firstName') {
      
      if (valid === true) {
        setfirstName(target_value);
      }
    } else if(target_name === 'lastName') {
      
      if (valid === true) {
       setlastName(target_value);
      }

    } else if(target_name === 'email') {

      if (valid === true) {
        setEmail(target_value);
      }

    } else if(target_name === 'password') {

      if (valid === true) {
        setPassword(target_value);
        // setValue({password: target_value});
      }
    }

    // console.log(value);
    console.log(target_name);
    console.log(target_value);
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log(email, password, firstName, lastName);
    const jsonObject = {email, password, firstName, lastName};
    console.log(jsonObject);

    fetch('http://localhost:8081/api/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'    
      },
      body:JSON.stringify({email, password, firstName, lastName})
    })
    .then(resp => resp.json())
    .then(resp => {
      if(resp.message === 'success') {
        // Navigate to Sign in
       setRedirect(true);

      }else if(resp.message === 'duplicate'){
        // Popup a Dailog of User Already exists
        setDailogTitle("User Already exits");
        setDailogContent('Use another email account, this email already exits. If you dont remember the password click on forgot password in Sign In')
        setOpen(true);
      }else {
        setDailogTitle("Error");
        setDailogContent(resp.message);
        setOpen(true);
      }
    })
    .catch(err => {
      // console.log(err);
        setDailogTitle("Error");
        setDailogContent(err.message);
        setOpen(true);
    });

  }

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  }

  const handleClose = () => {
    setOpen(false);
  }

  if(redirect){
    return <Redirect to={'/'} />
  }else{

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} method= "POST">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onBlur = {handleChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onBlur = {handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type = "email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur = {handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur = {handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" checked = {checked} onChange = {handleCheck}/>}
                label="I accept Terms and Conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled= {!checked}
          >
            Sign Up
          </Button>
          <Dailog open = {open} title = {dailogTitle} content = {dailogContent} handleClose = {handleClose}/>  
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
