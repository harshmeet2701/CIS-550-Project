import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useState, useEffect } from 'react';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

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
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [books, setBooks] = React.useState([]);
  const [likedbooks, setLikedBooks] = React.useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    console.log('In Dashboard');
    getReadBooks();
    getLikedBooks();
  })

  // Add code to display the to read and liked book
  function getReadBooks() {
    fetch("http://localhost:8081/api/book/dashboard/read",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(readBookList => {
        if (!readBookList) return;
        console.log(readBookList);

        let readBookDivs = readBookList.rows.map(readBookItem => (
          <GridListTile key={readBookItem[0]} style={{ height: '240px', width: '160px' }}>
            <img src={readBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : readBookItem[2]} alt={readBookItem[1]} style={{ height: '240px', width: '160px' }} />
            <GridListTileBar
              title={readBookItem[1]}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          readBookDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  function getLikedBooks() {
    // fetch("http://localhost:8081/api/book/dashboard/liked",
    fetch("http://localhost:8081/api/book/'/search/title/" + "harry",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(pubBookList => {
        if (!pubBookList) return;
        console.log(pubBookList);

        let likedBookDivs = pubBookList.rows.map(likedBookItem => (
          <GridListTile key={likedBookItem[0]} style={{ height: '240px', width: '160px' }}>
            <img src={likedBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : likedBookItem[2]} alt={likedBookItem[1]} style={{ height: '240px', width: '160px' }} />
            <GridListTileBar
              title={likedBookItem[1]}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setLikedBooks(
          likedBookDivs
        );
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Dashboard' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={4}>
            <Grid item xs={12} spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Have Read List
                </Typography>
                <GridList cellHeight={300} spacing={1} className={classes.gridList} >
                  {books}
                </GridList>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Liked List
                </Typography>
                <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                  {likedbooks}
                </GridList>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
