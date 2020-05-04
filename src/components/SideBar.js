import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }, 
  spacing: {
    minWidth: '40px',
  }
}));

export default function SideBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const auth = useSelector(state => state.auth);
  const [status, setStatus] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  useEffect(()=> {
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
    }else {
      setStatus(false);
      setRedirect(true);
    }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout = () => {
    let sessionObj = sessionStorage.getItem('sessionObject');
    let cacheObj = localStorage.getItem('cacheObject');

    if(sessionObj) {
      sessionStorage.removeItem('sessionObject');
    }

    if(cacheObj) {
      localStorage.removeItem('cacheObject');
    }

    setRedirect(true);
  }
  // console.log(auth);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  var personalItem = "";

  if(auth.auth != "") {
    personalItem = 
    <React.Fragment>
      <ListSubheader inset>Profile Settings</ListSubheader>
      
      <ListItem>
        <ListItemIcon className={classes.spacing}>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary= {<Typography variant="h7">{auth.auth}</Typography>} secondary= 'Email Address'  />
      </ListItem>

      <ListItem button>
        <ListItemIcon className={classes.spacing}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" onClick = {logout} />
      </ListItem>
    </React.Fragment>
  }else {
    //
    personalItem = 
    <React.Fragment>
      <ListSubheader inset>Not Logged In</ListSubheader>
      <ListItem button component={NavLink} to='/' exact>
        <ListItemIcon className={classes.spacing}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log In"/>
      </ListItem>
    </React.Fragment>
  }

  if(redirect) {
    return <Redirect to={'/'}/>
  }else {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.name}
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{personalItem}</List>
      </Drawer>
      </div>
  );
}
}