import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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

// function SearchNow(searchVal) {
//   alert("Here " + searchVal);

//   fetch("http://localhost:8081/api/book/search/title/" + searchVal,
//     {
//       method: 'GET' // The type of HTTP request.
//     }).then(res => {
//       // Convert the response data to a JSON.
//       return res.json();
//     }, err => {
//       // Print the error if there is one.
//       console.log(err);
//     }).then(SearchNow => {
//       if (!SearchNow) return;

//       console.log(SearchNow);
//       let searchDivs = SearchNow.rows.map(searchResult => (
//         <Button variant="contained" >{searchResult}</Button>
//       ));

//       //   // Set the state of the genres list to the value returned by the HTTP response from the server.
//       SearchNow(
//         searchDivs
//       );
//     }, err => {
//       // Print the error if there is one.
//       console.log(err);
//     });
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    maxWidth: '275',
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
  table: {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  }, 
  rating: {
    marginTop: '3%',
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});  

var ratings = [];

export default function Search() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [criteria, setCriteria] = React.useState([]);
  const [searchText, setsearchText] = useState("");
  const [selectedBook, setSelBook] = useState("");
  const [openDailogue, setOpenDailogue] = React.useState(false);
  const [authors, setAuthors] = useState([]);
  const [selectedrating, setRating] = useState(0);
  const [index, setIndex] = useState(-1);
  const auth = useSelector(state => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      // alert("Enter key pressed!"); 
      console.log('value', e.target.value);
    }
  }

  const getAuthors = (isbn)=> {

    fetch('http://localhost:8081/api/book/getAuthors/' + isbn, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        }
      })
    .then(resp => resp.json())
    .then(authorList => {
      console.log('getAuthors: ',authorList);
      if (!authorList) return;
      
      if (!authorList.rows) {
        setAuthors([]);
      } else {
        setAuthors(authorList.rows);
      }
    })  
  }

  const handleListItemClick = (book, index) => {
    getAuthors(book[0]);
    setSelBook(book);
    setIndex(index);    
    setRating(ratings[index]);
    setOpenDailogue(true);
  };

  const handleChange = (event) => {
    var criteria = event.target.value;
    setCriteria(criteria);
  };

  const handleChangeSearch = (event1) => {
    if(criteria === '') {
      setBooks([]);
    }

    if (criteria === 'title') {
      showTitle(event1.target.value);
    }
    if (criteria === "author") {
      showAuthors(event1.target.value);
    }
    if (criteria === "isbn") {
      showISBN(event1.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveRating = (isbn) => {
    console.log('Sel Rating:', selectedrating);
    ratings[index] =selectedrating;
    console.log('Ratings:', ratings[index]);

    fetch('http://localhost:8081/api/user/rateBook/' + isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email: auth.auth, rating: selectedrating})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          console.log('Rating Updated');
        }
      });
  }

  const handleCloseDailog = () => {
    saveRating(selectedBook[0]);
    setOpenDailogue(false);
  }

  const handleLikedBooks = (event, isbn) => {
   const button = event.target;

   if(button.innerHTML === 'Like') {
     // fetch call for Like make likeFlag: 1
     fetch('http://localhost:8081/api/user/likeBook/'+isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email: auth.auth, id:1})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          button.innerHTML = 'UnLike';
        }
      });
   }else if(button.innerHTML === 'UnLike') {
     // fetch call for Unlike make likeFlag: 0
     fetch('http://localhost:8081/api/user/likeBook/'+isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email: auth.auth, id:0})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          button.innerHTML = 'Like';
        }
      });
   }
  }

  const handleReadBooks = (event, isbn) => {
    const button = event.target;

    if(button.innerHTML === 'Mark Read') {
      // fetch call for Read make readFlag: 1
      fetch('http://localhost:8081/api/user/readBook/'+isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email: auth.auth, id:1})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          button.innerHTML = 'Mark UnRead';
        }
      });

    }else if(button.innerHTML === 'Mark UnRead') {
      // fetch call for UnRead make readFlag: 0
      fetch('http://localhost:8081/api/user/readBook/'+isbn, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'    
        },
        body:JSON.stringify({email: auth.auth, id:0})
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp.message === 'success') {
          button.innerHTML = 'Mark Read';
        }
      });
    }
  }

  function showTitle(searchCriteria) {
    
    fetch("http://localhost:8081/api/book/search/title/" + searchCriteria.toLowerCase(),
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(bookList => {
        if (!bookList) return;
        // console.log(bookList);
        ratings = [];
        
        let bookDivs = bookList.rows.map((book, i) => {
          ratings.push(book[14]);
          return (
          < Grid item key={i} xs={3} style={{ height: '400px', width: '180px' }}>
          <Card className={classes.card}>
            <CardMedia className ={classes.cardMedia}
              image={book[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : book[2]}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h7" component="h4">
                {book[1]}
              </Typography>
            </CardContent>
            <CardActions style={{width:'100%'}}>
            <Button size="medium" color="primary" onClick = {() => handleListItemClick(book, i)}>
                View
            </Button>
            <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, book[0])}}>
                {book[13] ? "UnLike" : "Like" }
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, book[0])}}>
                {book[12] ? 'Mark UnRead': 'Mark Read'}
              </Button>
            </div>
            </CardActions>
          </Card>
         </Grid >
        )
      });

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          bookDivs
        );
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  function showAuthors(searchCriteria) {
    console.log("Value " + searchCriteria);
    fetch("http://localhost:8081/api/book/search/author/" + searchCriteria.toLowerCase(),
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(authorList => {
        if (!authorList) return;

        ratings = [];
        let authorDivs = authorList.rows.map((author, i) => {
          ratings.push(author[14]);
          return (
          < Grid item key={i} xs={3} style={{ height: '400px', width: '180px' }}>
          <Card className={classes.card}>
            <CardMedia className ={classes.cardMedia}
              image={author[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : author[2]}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h7" component="h4">
                {author[1]}
              </Typography>
            </CardContent>
            <CardActions style={{width:'100%'}}>
            <Button size="medium" color="primary" onClick = {() => handleListItemClick(author)}>
                View
            </Button>
            <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, author[0])}}>
                {author[13] ? "UnLike" : "Like" }
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, author[0])}}>
                {author[12] ? 'Mark UnRead': 'Mark Read'}
              </Button>
            </div>
            </CardActions>
          </Card>
         </Grid >
        )
      });
        
        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          authorDivs
        );
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  function showISBN(searchCriteria) {
    fetch("http://localhost:8081/api/book/search/isbn/" + searchCriteria.toLowerCase(),
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(isbnList => {
        if (!isbnList) return;

        ratings = [];
        let isbnDivs = isbnList.rows.map((isbn, i) => {
          ratings.push(isbn[14]);
          return (
          < Grid item key={i} xs={3} style={{ height: '400px', width: '180px' }}>
          <Card className={classes.card}>
            <CardMedia className ={classes.cardMedia}
              image={isbn[2] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : isbn[2]}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h7" component="h4">
                {isbn[1]}
              </Typography>
            </CardContent>
            <CardActions style={{width:'100%'}}>
            <Button size="medium" color="primary" onClick = {() => handleListItemClick(isbn)}>
                View
            </Button>
            <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, isbn[0])}}>
              {isbn[13] ? "UnLike" : "Like" }
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, isbn[0])}}>
                {isbn[12] ? 'Mark UnRead': 'Mark Read'}
              </Button>
            </div>
            </CardActions>
          </Card>
         </Grid >
        )
      });

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          isbnDivs
        );
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Search Books' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" >
        <Grid container xs = {12} spacing={2} className={classes.container}>
        <Grid item xs={2} spacing={2}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Select Search Criteria</InputLabel>
          <Select
            native
            style={{ width: `${200}px` }}
            onChange={handleChange}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            inputProps={{
              name: 'criteria',
              id: 'filled-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={"title"}>Title</option>
            <option value={"author"}>Authors</option>
            <option value={"isbn"}>ISBN</option>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={9}  spacing={8}>
          <TextField
            name="searchText"
            variant="outlined"
            required
            fullWidth
            id="searchText"
            label="Search"
            autoFocus
            onKeyDown={keyPress}
            onBlur={handleChangeSearch}
          />
          </Grid>
          </Grid>
          <Grid container spacing={2}>
            {books}

          {/* < Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className ={classes.cardMedia}
                image={'https://s1.nyt.com/du/books/images/9781476746586.jpg'}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                sasax jnkjkasnj sajnkjnkj kjnasdkjnk k ksjnadkjnasdkjn kjsandkjnadskjn kjsadnkjnadskjnsad kjnkjnksadj kjnkjnsad kjnskdjankadsn  knbskajdnkasjn kjnsakdjnksadnkjads nkjnadsknsadkjnsadkjn
                </Typography>
              </CardContent>
              <CardActions style={{width:'100%'}}>
              <Button size="medium" color="textSecondary">
                  View
              </Button>
              <div style={{width: '100%', textAlign:'right'}}>
              <Tooltip title="Like">
              <IconButton aria-label="add to favorites">
                <FavoriteBorderOutlinedIcon color="secondary"/>
              </IconButton>
              </Tooltip>
              <Tooltip title="BookMark">
              <IconButton aria-label="add to bookmark">
                <BookmarkBorderIcon color="textSecondary"/>
              </IconButton>
              </Tooltip>
              </div>
              </CardActions>
            </Card>
           </Grid > */}
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
            <Grid item xs={4} style = {{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
              <div>
                {/* <img src= {'https://i.imgur.com/sJ3CT4V.gif'} style= {{width: "180%", objectFit: "contain",  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} /> */}
                <a href= {selectedBook[2] ? selectedBook[2]: 'https://i.imgur.com/sJ3CT4V.gif'} target={'_blank'}><img alt = {'Book'} src= {selectedBook[2] ? selectedBook[2]:'https://i.imgur.com/sJ3CT4V.gif'} style= {{width: "100%", objectFit: "contain",  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} /></a>

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

            <Grid item xs={8} style = {{display: 'flex', marginTop: '5%'}}>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="left" style={{width: '5em'}}>
                    <Typography variant="h5" component="h1">
                      ISBN: 
                    </Typography>
                    </TableCell>
                  <TableCell align="left" style={{width: '15rem'}}>
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
                  <TableCell align="left" style={{width: '5em'}}>
                    <Typography variant="h5" component="h1">
                      Title: 
                    </Typography>
                    </TableCell>
                  <TableCell align="left" >
                    <Typography variant="h7">
                   { selectedBook[1]  }                    
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
                  <TableCell align="left" style={{width: '5em'}}>
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
                  <TableCell align="left" style={{width: '5em'}}>
                    <Typography variant="h5" component="h1">
                      URL
                    </Typography>
                    </TableCell>
                  <TableCell align="left" >
                    <Typography variant="h9">
                     {/* Selected URL */}
                     {
                     <a href={selectedBook[4] ? (selectedBook[4].includes('http')  ? selectedBook[4] : "https://www.bookdepository.com" + selectedBook[4] ) : ''} target={'_blank'}>{selectedBook[4] ? (selectedBook[4].includes('http')  ? selectedBook[4] : "https://www.bookdepository.com" + selectedBook[4] ) : ''}</a>
                      }
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography variant="h5" component="h1">
                      Ages: 
                    </Typography>
                    </TableCell>
                  <TableCell align="left" >
                    <Typography variant="h6">
                       {selectedBook[11]}
                    </Typography>
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell align="left" style={{width: '5em'}}>
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
                  <TableCell align="left" style={{width: '5em'}}>
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
                  <TableCell align="left" style={{width: '12rem'}}>
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
                  <TableCell align="left" style={{width: '5em'}}>
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