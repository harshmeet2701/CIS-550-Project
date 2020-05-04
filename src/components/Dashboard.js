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
import { useSelector } from 'react-redux';
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
import Rating from '@material-ui/lab/Rating';

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
  gridList: {
    // flexWrap: 'nowrap',
    width: 'nowrap',
    height: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
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

var ratings = [];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [books, setBooks] = React.useState([]);
  const [likedbooks, setLikedBooks] = React.useState([]);
  const auth = useSelector(state => state.auth);
  const [selectedBook, setSelBook] = useState("");
  const [index, setIndex] = useState(-1);
  const [selectedrating, setRating] = useState(0);
  const [openDailogue, setOpenDailogue] = React.useState(false);
  const [authors, setAuthors] = useState([]);

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

  const handleCloseDailog = () => {
    saveRating(selectedBook[0]);
    setOpenDailogue(false);
  }

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

  const handleListItemClick = (authBookItem, index) => {
    getAuthors(authBookItem[0]);
    setSelBook(authBookItem);
    setIndex(index);
    setRating(ratings[index]);
    setOpenDailogue(true);
  };

  const saveRating = (isbn) => {
    console.log('Sel Rating:', selectedrating);
    ratings[index] = selectedrating;
    console.log('Ratings:', ratings[index]);

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


  // Add code to display the to read and liked book
  function getReadBooks() {
    fetch("http://localhost:8081/api/book/search/title/" + "dan",
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

        let readBookDivs = readBookList.rows.map((readBookItem, i) => (
          <GridListTile item key={i} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(readBookItem, i)}>
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
    fetch("http://localhost:8081/api/book/search/title/" + "harry",
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

        let likedBookDivs = pubBookList.rows.map((likedBookItem, i) => (
          <GridListTile item key={i} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(likedBookItem, i)}>
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
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Have Read List
                </Typography>
            <GridList cellHeight={300} spacing={1} className={classes.gridList} >
              {books}
            </GridList>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Liked List
                </Typography>
            <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
              {likedbooks}
            </GridList>
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
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
