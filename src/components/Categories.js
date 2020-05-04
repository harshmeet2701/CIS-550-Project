import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import image from '../assets/images/bookdisplay.jpg';
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
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import Slide from '@material-ui/core/Slide';

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
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
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
  tile: {
    "&:hover": {
      cursor: 'pointer'
    }
  }
}));

var ratings = [];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Categories() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // Update the document title using the browser API
  const [categories, setCategories] = React.useState([]);
  const [nycategory, setNYCategories] = React.useState([]);
  const [publishercategory, setPublisherCategories] = React.useState([]);
  const [ratedcategory, setRatedCategories] = React.useState([]);
  const [displayPubTitle, setDisplayPubTitle] = React.useState([]);
  const [displayRateTitle, setDisplayRateTitle] = React.useState([]);
  const [displayNYTitle, setDisplayNYTitle] = React.useState([]);
  const [newBooks, setNewBooks] = React.useState([]);
  const [titleForNewBooks, setTitleForNewBooks] = React.useState([]);
  const [titleForList, setTitleForList] = React.useState([]);
  const auth = useSelector(state => state.auth);
  const [selectedBook, setSelBook] = useState("");
  const [index, setIndex] = useState(-1);
  const [selectedrating, setRating] = useState(0);
  const [openDailogue, setOpenDailogue] = React.useState(false);
  const [authors, setAuthors] = useState([]);


  const getAuthors = (isbn) => {

    fetch('http://localhost:8081/api/book/getAuthors/' + isbn, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(authorList => {
        console.log('getAuthors: ', authorList);
        if (!authorList) return;

        if (!authorList.rows) {
          setAuthors([]);
        } else {
          setAuthors(authorList.rows);
        }
      })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseDailog = () => {
    setOpenDailogue(false);
  }

  const handleListItemClick = (authBookItem, index) => {
    getAuthors(authBookItem[0]);
    setSelBook(authBookItem);
    setIndex(index);
    setRating(ratings[index]);
    setOpenDailogue(true);
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

          <Button variant="outlined" size="medium" color="primary" className={classes.margin} disableElevation onClick={() => callAllSections(categoryName)}>
            {categoryName}
          </Button>

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
          var nybookDivs = [];
          console.log("nylist" + nybookList.rows.length);
          nybookDivs = nybookList.rows.map((nybookItem, i) => (

            <GridListTile key={nybookItem[0]} className={classes.tile} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(nybookItem, i)}>
              <img src={nybookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : nybookItem[2]} alt={nybookItem[1]} style={{ height: '240px', width: '160px' }} />
              <GridListTileBar
                title={nybookItem[1]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));

          setNYCategories(
            []
          );
          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setNYCategories(
            nybookDivs
          );
          setDisplayNYTitle(
            'BestSelling NYTimes Books for ' + categoryName
          );

        }, err => {
          // Print the error if there is one.
          console.log(err);
        });
    }

    function showPublisher(categoryName) {
      console.log("in publisherL" + categoryName)
      var publisherBookList = [];
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

          // A button which triggers the showMovies function for each genre.
          console.log("lis:" + publisherBookList.rows.length);
          let publisherBookDivs = publisherBookList.rows.map((publisherBookItem, i) => (
            // <Button variant="contained" >{publisherBookItem[1]}</Button>
            <GridListTile item key={publisherBookItem[0]} className={classes.tile} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(publisherBookItem, i)}>
              <img src={publisherBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : publisherBookItem[2]} alt={publisherBookItem[1]} style={{ height: '240px', width: '160px' }} />
              <GridListTileBar
                title={publisherBookItem[1]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));
          setPublisherCategories(
            []
          );
          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setPublisherCategories(
            publisherBookDivs
          );
          setDisplayPubTitle(
            'Books by Top Publishers for ' + categoryName
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
          console.log(ratedBookList.rows.length);
          let ratedBookDivs = ratedBookList.rows.map((ratedBookItem, i) => (

            <GridListTile item key={ratedBookItem[0]} className={classes.tile} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(ratedBookItem, i)}>
              <img src={ratedBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : ratedBookItem[2]} alt={ratedBookItem[1]} style={{ height: '240px', width: '160px' }} />
              <GridListTileBar
                title={ratedBookItem[1]}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ));
          setRatedCategories(
            []
          );
          //   // Set the state of the genres list to the value returned by the HTTP response from the server.
          setRatedCategories(
            ratedBookDivs
          );

          setDisplayRateTitle(
            'Top Rated Books for ' + categoryName
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
              {categories}
            </Grid>
            <Grid item xs={12} >
              <Typography variant="subtitle1" gutterBottom>
                {displayNYTitle}
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {nycategory}
              </GridList>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="subtitle1" gutterBottom>
                {displayPubTitle}
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {publishercategory}
              </GridList>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="subtitle1" gutterBottom>
                {displayRateTitle}
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {ratedcategory}
              </GridList>
            </Grid>
          </Grid>
          <Dialog fullScreen open={openDailogue} onClose={handleCloseDailog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleCloseDailog} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Book Details
              </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
              <Grid container xs={12} spacing={2} className={classes.container} >
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                  <div>
                    {/* <img src= {'https://i.imgur.com/sJ3CT4V.gif'} style= {{width: "180%", objectFit: "contain",  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} /> */}
                    <a href={selectedBook[2] ? selectedBook[2] : 'https://i.imgur.com/sJ3CT4V.gif'} target={'_blank'}><img alt={'Book'} src={selectedBook[2] ? selectedBook[2] : 'https://i.imgur.com/sJ3CT4V.gif'} style={{ width: "100%", objectFit: "contain", boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} /></a>
                  </div>
                </Grid>

                <Grid item xs={8} style={{ display: 'flex', marginTop: '5%' }}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              ISBN:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" style={{ width: '15rem' }}>
                            <Typography variant="h6">
                              {selectedBook[0]}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography variant="h5" component="h1">
                              Rating:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h6">
                              {selectedBook[8]}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              Title:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h7">
                              {selectedBook[1]}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography variant="h5" component="h1">
                              Pages:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h6">
                              {selectedBook[9]}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              Description
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h7">
                              {selectedBook[3]}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography variant="h5" component="h1">
                              Language:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h6">
                              {selectedBook[10]}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              URL
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h9">
                              {
                             <a href={selectedBook[4] ? (selectedBook[4].includes('http')  ? selectedBook[4] : "https://www.bookdepository.com" + selectedBook[4] ) : ''} target={'_blank'}>{selectedBook[4] ? (selectedBook[4].includes('http')  ? selectedBook[4] : "https://www.bookdepository.com" + selectedBook[4] ) : ''}</a>
                                }
                            </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            <Typography variant="h6">
                              {selectedBook[11]}
                            </Typography>
                          </TableCell>
                        </TableRow>


                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              Authors:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >

                            <Table aria-label="simple table">
                              {authors.map((author, i) => {
                                return (
                                  <TableRow>
                                    <TableCell align="left" >
                                      <Typography variant="h7">
                                        {author.WIKIURL ? <a href={author.WIKIURL} target={'_blank'}> {author.AUTHORNAME} </a> : author.AUTHORNAME}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </Table>

                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              Publisher:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            {/* Selected Publisher */}
                            <Typography variant="h7">
                              {selectedBook[5]}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '12rem' }}>
                            <Typography variant="h5" component="h1">
                              Publication Place:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            {/* Selected Place */}
                            <Typography variant="h7">
                              {selectedBook[6]}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" style={{ width: '5em' }}>
                            <Typography variant="h5" component="h1">
                              Publication Date:
                    </Typography>
                          </TableCell>
                          <TableCell align="left" >
                            {/* Selected ISBN */}
                            <Typography variant="h6">
                              {selectedBook[7]}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
          {/* <Box pt={4}>
            <Copyright />
          </Box> */}
        </Container>
      </main>
    </div>
  );
}

