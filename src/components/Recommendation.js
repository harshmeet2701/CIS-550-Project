import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import Slide from '@material-ui/core/Slide';
import Rating from '@material-ui/lab/Rating';

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
  tabs: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  card: {
    maxWidth: '50',
    height: '100%',
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  cardMedia: {
    //  height: '75%', 
    height: 0,
    paddingTop: '87.25%', // 16:9
  },
  cardContent: {
    height: '20%',
    overflow: 'auto',
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
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

var ratings = [];
var ratingsRead = [];
var ratingsLike = [];

export default function Recommendation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [selectedrating, setRating] = React.useState(0);
  const [readBookRec, setreadRecBooks] = React.useState([]);
  const [likedBookRec, setlikedRecBooks] = React.useState([]);
  const [nyTimesBookRec, setnyTimesRecBooks] = React.useState([]);
  const [openDailogue, setOpenDailogue] = React.useState(false);
  const [type, setType] = useState("");
  const [index, setIndex] = useState(-1);
  const [selectedBook, setSelBook] = useState("");
  const [authors, setAuthors] = useState([]);

  const theme = useTheme();
  const auth = useSelector(state => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
      showrecommendationLiked();
    } else if (newValue == 2) {
      showrecommendationNyTimes();
    } else if (newValue == 0) {
      showrecommendationRead();
    }
  };

  useEffect(() => {
    console.log('In Recommendation');
    showrecommendationRead();
  }, []);

  const handleCloseDailog = () => {
    saveRating(selectedBook[0]);
    setOpenDailogue(false);
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const saveRating = (isbn) => {
    console.log('Sel Rating:', selectedrating);
    if (type === 'read') {
      ratingsRead[index] = selectedrating;
    } else if (type === 'like') {
      ratingsLike[index] = selectedrating;
    }
    console.log('Ratings:', ratingsRead[index]);

    fetch('http://localhost:8081/api/user/rateBook/' + isbn, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: auth.auth, rating: selectedrating })
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message === 'success') {
          console.log('Rating Updated');
        }
      });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Function when view is clicked
  const handleListItemClick = (book, index) => {
    getAuthors(book[0]);
    setSelBook(book);
    setIndex(index);
    setRating(ratings[index]);
    setOpenDailogue(true);
  };

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

  const handleLikedBooks = (event, isbn) => {
    const button = event.target;

    if (button.innerHTML === 'Like') {
      // fetch call for Like make likeFlag: 1
      fetch('http://localhost:8081/api/user/likeBook/' + isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: auth.auth, id: 1 })
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message === 'success') {
            button.innerHTML = 'UnLike';
          }
        });
    } else if (button.innerHTML === 'UnLike') {
      // fetch call for Unlike make likeFlag: 0
      fetch('http://localhost:8081/api/user/likeBook/' + isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: auth.auth, id: 0 })
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message === 'success') {
            button.innerHTML = 'Like';
          }
        });
    }
  }

  const handleReadBooks = (event, isbn) => {
    const button = event.target;

    if (button.innerHTML === 'Mark Read') {
      // fetch call for Read make readFlag: 1
      fetch('http://localhost:8081/api/user/readBook/' + isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: auth.auth, id: 1 })
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message === 'success') {
            button.innerHTML = 'Mark UnRead';
          }
        });

    } else if (button.innerHTML === 'Mark UnRead') {
      // fetch call for UnRead make readFlag: 0
      fetch('http://localhost:8081/api/user/readBook/' + isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: auth.auth, id: 0 })
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message === 'success') {
            button.innerHTML = 'Mark Read';
          }
        });
    }
  }


  const showrecommendationRead = () => {
    const email = auth.auth;
    fetch("http://localhost:8081/api/book/recommended/booksRead/" + email,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(readBookRecList => {
        if (!readBookRecList) return;
        console.log(readBookRecList);

        let readBookRecDivs = readBookRecList.rows.map((readBookRec, i) => (
          // 0 - 1 - ISBN
          // 2 - Title, 3 - Desc , 4 -URL, 5 - IMG_URL, 6 - Publisher, 7 - Publisher Date, 8 - Publishing Place, 9 - Rating
          // 10 - Format_name, 11 - NUM_Pages, 12 - Lang, 13- Ages
          <Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia}
                image={readBookRec[5]}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                  {readBookRec[3]}
                </Typography>
              </CardContent>
              <CardActions style={{ width: '100%' }}>
                <Button size="medium" color="textSecondary" onClick={() => handleListItemClick(readBookRec, i)}>
                  View
              </Button>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <Button color="secondary" onClick={(event) => { handleLikedBooks(event, readBookRec[0]) }}>
                    Like
                  </Button>
                  <Button color="primary" onClick={(event) => { handleReadBooks(event, readBookRec[0]) }}>
                    Mark read
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid >

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setreadRecBooks(
          readBookRecDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  const showrecommendationNyTimes = () => {
    const email = auth.auth;
    fetch("http://localhost:8081/api/book/recommended/nyauthor/" + email,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(nyTimesBookRecList => {
        if (!nyTimesBookRecList) return;
        console.log(nyTimesBookRecList);
        ratingsLike = []

        let nyTimesBookRecDivs = nyTimesBookRecList.rows.map((nyTimesBookRec, i) => (
          <Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia}
              // image={nyTimesBookRec[5]}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                  {nyTimesBookRec[1]}
                </Typography>
              </CardContent>
              <CardActions style={{ width: '100%' }}>
                <Button size="medium" color="textSecondary" onClick={() => handleListItemClick(nyTimesBookRec, i)}>
                  View
              </Button>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <Button color="secondary" onClick={(event) => { handleLikedBooks('', '') }}>
                    Like
                  </Button>
                  <Button color="primary" onClick={(event) => { handleReadBooks(event, nyTimesBookRec[0]) }}>
                    Mark read
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid >

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setnyTimesRecBooks(
          nyTimesBookRecDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  const showrecommendationLiked = () => {
    const email = auth.auth;
    fetch("http://localhost:8081/api/book/recommended/booksLiked/" + email,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(likedBookRecList => {
        if (!likedBookRecList) return;
        console.log(likedBookRecList);

        let likedBookRecDivs = likedBookRecList.rows.map((likedBookRec, i) => (
          <Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia}
                image={likedBookRec[5]}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                  {likedBookRec[3]}
                </Typography>
              </CardContent>
              <CardActions style={{ width: '100%' }}>
                <Button size="medium" color="textSecondary" onClick={() => handleListItemClick(likedBookRec, i)}>
                  View
              </Button>
                <div style={{ width: '100%', textAlign: 'right' }}>
                  <Button color="secondary" onClick={(event) => { handleLikedBooks(event, likedBookRec[0]) }}>
                    Like
                  </Button>
                  <Button color="primary" onClick={(event) => { handleReadBooks(event, likedBookRec[0]) }}>
                    Mark read
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid >

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setlikedRecBooks(
          likedBookRecDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Recommended Books' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.tabs}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Recommendation Based on Read Books" {...a11yProps(0)} />
              <Tab label="Recommendation Based on Liked Books" {...a11yProps(1)} />
              <Tab label="Recommendation From NY Times" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {/* Recommendation 1 */}
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container spacing={2}>
                {/* Book Cards */}
                {readBookRec}
              </Grid>
            </TabPanel>

            {/* Recommendation 2 */}
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container spacing={2}>
                {likedBookRec}
              </Grid>
            </TabPanel>

            {/* Recommendation 3 */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Grid container spacing={2}>
                {nyTimesBookRec}
              </Grid>
            </TabPanel>
          </SwipeableViews>
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
                    <a href={selectedBook[5] ? selectedBook[5] : 'https://i.imgur.com/sJ3CT4V.gif'} target={'_blank'}><img alt={'Book'} src={selectedBook[5] ? selectedBook[5] : 'https://i.imgur.com/sJ3CT4V.gif'} style={{ width: "100%", objectFit: "contain", boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }} /></a>

                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">Rate Book</Typography>
                      <Rating
                        name="book-rating"
                        value={selectedrating ? selectedrating : 0}
                        onChange={(event, newValue) => {
                          // sel[index] = newValue;
                          setRating(newValue);
                        }}
                      />
                    </Box>
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
                              <a href={selectedBook[4] ? selectedBook[4] : ''} target={'_blank'}>{selectedBook[4]}</a>
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
        </div>
      </main>
    </div>
  );
}
