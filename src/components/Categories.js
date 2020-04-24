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
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SideBar from './SideBar';
import { Hidden } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
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

// export default class Categories extends React.Component {
//   constructor(props) {
//     super(props);

//     // The state maintained by this React Component. This component maintains the list of genres,
//     // and a list of movies for a specified genre.
//     this.state = {
//       genres: [],
//       movies: []
//     }
//   }
// React function that is called when the page load.




export default function Categories() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // Update the document title using the browser API
  const [categories, setCategories] = React.useState([]);
  const [nycategory, setNYCategories] = React.useState([]);
  const [publishercategory, setPublisherCategories] = React.useState([]);
  const [ratedcategory, setRatedCategories] = React.useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/api/book/categories",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(categoryList => {
        if (!categoryList) return;
        // Map each categoryObj in categoryList to an HTML element:
        // A button which triggers the showAllsections function for each genre.
        console.log(categoryList);

        let categoryDivs = categoryList.rows.map(categoryName => (

          // <GridListTile key={categoryName}>
            <Button variant="contained" size= "medium" className={classes.margin} disableElevation onClick={() => callAllSections(categoryName)}>
              {categoryName}
            </Button>
          // </GridListTile>

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setCategories(
          categoryDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });

    function callAllSections(categoryName) {
      showNYAuthors(categoryName);
      showPublisher(categoryName);
      showTopRated(categoryName);
    }

    function showNYAuthors(categoryName) {
      fetch("http://localhost:8081/api/book/categories/nyauthor/" + categoryName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(nybookList => {
          if (!nybookList) return;
          let image = './default_img.jpg';
          console.log("nylist"+nybookList);
          let nybookDivs = nybookList.rows.map(nybookItem => (
            // <Button variant="contained" >{nybookItem[1]}</Button>
            <GridListTile key={nybookItem[0]}>
              <img src={nybookItem[3]===null?image:nybookItem[3]} alt={nybookItem[1]} />
              <GridListTileBar
                title={nybookItem[1]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));

          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setNYCategories(
            nybookDivs
          );
        }, err => {
          // Print the error if there is one.
          console.log(err);
        });
    }

    function showPublisher(categoryName) {
      console.log("in publisherL" + categoryName)
      fetch("http://localhost:8081/api/book/categories/publisher/" + categoryName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          console.log("got some")
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log("err");
        }).then(publisherBookList => {
          if (!publisherBookList) return;
          // Map each genreObj in genreList to an HTML element:
          var image = "./default_img.jpg";
          // A button which triggers the showMovies function for each genre.
          console.log("lis:" + publisherBookList);
          let publisherBookDivs = publisherBookList.rows.map(publisherBookItem => (
            // <Button variant="contained" >{publisherBookItem[1]}</Button>
            <GridListTile key={publisherBookItem[0]}>
              <img src={publisherBookItem[3]===null?image:publisherBookItem[3]} alt={publisherBookItem[1]} />
              <GridListTileBar
                title={publisherBookItem[1]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));

          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setPublisherCategories(
            publisherBookDivs
          );
        }, err => {
          // Print the error if there is one.
          console.log("some other error");
          console.log(err);
        });
    }
    function showTopRated(categoryName) {
      fetch("http://localhost:8081/api/book/categories/topRated/" + categoryName,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(ratedBookList => {
          if (!ratedBookList) return;
          // Map each genreObj in genreList to an HTML element:
          // A button which triggers the showMovies function for each genre.
          console.log(ratedBookList);
          let ratedBookDivs = ratedBookList.rows.map(ratedBookItem => (
            // <Button variant="contained" orientation="horizontal">{ratedBookItem[2]}</Button>
            // <GridListTile key={ratedBookItem[0]}>
            //   <img src={ratedBookItem[4]} alt={ratedBookItem[2]} />
            // </GridListTile>
            <GridListTile key={ratedBookItem[0]}>
              <img src={ratedBookItem[4]} alt={ratedBookItem[2]} />
              <GridListTileBar
                title={ratedBookItem[2]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));

          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setRatedCategories(
            ratedBookDivs
          );
        }, err => {
          // Print the error if there is one.
          console.log(err);
        });
    }
  });


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Categories' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={4}>
            <Grid item xs={12} container alignItems="center" justify="center" direction="row">
              {/* <Paper> */}
                {/* <GridList cellHeight={55} className={classes.gridList} cols={12}> */}
                  {categories}
            </Grid>

              {/* </Paper> */}

          {/* </Grid> */}
            {/* Recent Deposits */}

            {/* Recent Orders */}
            <Hidden xsDown>
              <Grid item xs={12} >
                <Typography variant="subtitle1" gutterBottom>
                  Books by New York Times Authors
                </Typography>
                <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                  {nycategory}
                </GridList>
              </Grid>
            </Hidden>

            <Grid item xs={12} >
              <Typography variant="subtitle1" gutterBottom>
                Books by Top Publishers
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {publishercategory}
              </GridList>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="subtitle1" gutterBottom>
                Top Rated Books
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {ratedcategory}
              </GridList>
            </Grid>

          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

