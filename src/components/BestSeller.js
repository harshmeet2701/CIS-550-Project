import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
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
import Rating from '@material-ui/lab/Rating';

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
  gridList: {
    // flexWrap: 'nowrap',
    width: 'nowrap',
    height: 500,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

export default function BestSeller() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [displayVal, setDisplayVal] = React.useState([]);
  const [disable, setdisabled] = React.useState(true);
  const [criteria, setCriteria] = React.useState([]);
  const [criteriaDivs, setCriteriaDivs] = React.useState([]);
  const [books, setBooks] = React.useState([]);
  const [newBooks, setNewBooks] = React.useState([]);
  const [titleForNewBooks, setTitleForNewBooks] = React.useState([]);
  const [titleForList, setTitleForList] = React.useState([]);
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
  const handleChange = (event) => {
    var criteria = event.target.value;
    setCriteria(criteria);
    if (criteria !== "") {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
    if (criteria === "publisher") {
      getTopPublishers();
    }
    if (criteria === "author") {
      getTopAuthors();
    }

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

  const handleChangeCriteria = (event1) => {
    if (criteria === "publisher") {
      setDisplayVal(event1.target.value);
      getTopNYBooksPublishers(event1.target.value);
    }
    if (criteria === "author") {
      setDisplayVal(event1.target.value);
      getTopNYBooksAuthors(event1.target.value);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function getTopPublishers() {
    fetch("http://localhost:8081/api/book/bestseller/publisher",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(pubList => {
        if (!pubList) return;
        // Map each categoryObj in categoryList to an HTML element:
        // A button which triggers the showAllsections function for each genre.
        console.log(pubList);

        let pubDivs = pubList.rows.map(pubName => (
          <option value={pubName[0]}>{pubName[0]}</option>

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setCriteriaDivs(
          pubDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  function getTopAuthors() {
    fetch("http://localhost:8081/api/book/bestseller/nyauthor",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(authList => {
        if (!authList) return;
        console.log(authList);

        let authDivs = authList.rows.map(authName => (
          <option value={authName[0]}>{authName[0]}</option>
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setCriteriaDivs(
          authDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  function getTopNYBooksAuthors(authorName) {
    fetch("http://localhost:8081/api/book/bestseller/nyauthor/" + authorName,
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(authBookList => {
        if (!authBookList) return;
        console.log(authBookList);
        ratings = [];

        let authBookDivs = authBookList.rows.map((authBookItem, i) => (
          ratings.push(authBookItem[14]),
          <GridListTile item key={i} style={{ height: '300px', width: '160px' }} onClick={() => handleListItemClick(authBookItem, i)}>
            <img src={authBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : authBookItem[2]} alt={authBookItem[1]} style={{ height: '300px', width: '160px' }} />
            <GridListTileBar
              title={authBookItem[1]}
              actionPosition="left"
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />

          </GridListTile>
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          authBookDivs
        );
        setTitleForList(
          'Books by ' + authorName
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }


  function getTopNYBooksPublishers(pubName) {
    fetch("http://localhost:8081/api/book/bestseller/publisher/" + pubName,
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
        ratings = [];

        let pubBookDivs = pubBookList.rows.map((pubBookItem, i) => (
          <GridListTile item key={i} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(pubBookItem, i)}>
            <img src={pubBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : pubBookItem[2]} alt={pubBookItem[1]} style={{ height: '240px', width: '160px' }} />
            <GridListTileBar
              title={pubBookItem[1]}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>

        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          pubBookDivs
        );
        setTitleForList(
          'Books by ' + pubName
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }
  useEffect(() => {

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/api/book/bestseller/new",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(newBookList => {
        if (!newBookList) return;
        console.log(newBookList);
        ratings = [];

        let newBookDivs = newBookList.rows.map((newBookItem, i) => (
          <GridListTile item key={i} style={{ height: '240px', width: '160px' }} onClick={() => handleListItemClick(newBookItem, i)}>
            <img src={newBookItem[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : newBookItem[2]} alt={newBookItem[1]} style={{ height: '240px', width: '160px' }} />
            <GridListTileBar
              title={newBookItem[1]}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setNewBooks(
          newBookDivs
        );
        setTitleForNewBooks(
          'New BestSellers On The List'
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Best Selling Books' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Criteria</InputLabel>
                <Select
                  native
                  value={criteria}
                  onChange={handleChange}
                  inputProps={{
                    name: 'criteria',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"publisher"}>BestSelling Publisher</option>
                  <option value={"author"}>BestSelling Author</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} disabled={disable}>
                <InputLabel htmlFor="age-native-helper">{criteria}</InputLabel>
                <NativeSelect
                  value={displayVal}
                  onChange={handleChangeCriteria}
                  inputProps={{
                    name: 'criteria',
                    id: 'age-native-helper',
                  }}
                >
                  <option aria-label="None" value="" />
                  {criteriaDivs}
                </NativeSelect>
                <FormHelperText>Choose criteria to see best sellers</FormHelperText>
              </FormControl>
              {/* </Paper> */}
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom disable={true}>
                {titleForList}
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} >
                {books}
              </GridList>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom disable={true}>
                {titleForNewBooks}
              </Typography>
              <GridList cellHeight={300} spacing={1} className={classes.gridList} cols={5}>
                {newBooks}
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
