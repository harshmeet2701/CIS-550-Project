import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SearchBar from 'material-ui-search-bar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { sizing } from '@material-ui/system';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function Search() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [books, setBooks] = React.useState([]);
  const [searchText, setsearchText] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      // alert("Enter key pressed!"); 
      console.log('value', e.target.value);
    }
  }

  const handleChange = (event) => {
    const target_name = event.target.name;
    const target_value = event.target.value;
    // alert("searchText value=" + target_value);
    setsearchText(target_value);

    console.log("target_name = " + target_name);
    console.log("target_value = " + target_value);

    handleSearchText(event);
  }

  const handleSearchText = (event) => {
    event.preventDefault();
    console.log("searchText in handleSearchText = " + event.target.value);

    fetch("http://localhost:8081/api/book/search/title/" + event.target.value,
      {
        method: 'GET'
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(bookList => {
        if (!bookList) return;

        let bookDivs = bookList.rows.map((book, i) => (
          console.log(book[4]),
          < Grid item key={book.isbn} xs={12} sm={6} md={4} >
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={book[4]}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book[1]}
                </Typography>
                <Typography>
                  <Box width={1}>
                    <TextField
                      style={{ width: 250 }}
                      placeholder="MultiLine with rows: 2 and rowsMax: 4"
                      multiline
                      rows={10}
                      rowsMax={10}
                      defaultValue={book[5]}
                    />
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  {book[3]}
                </Button>
                <Button size="small" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid >
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setBooks(
          bookDivs
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });


  }

  // useEffect(() => {

  //   // Send an HTTP request to the server.
  //   fetch("http://localhost:8081/api/book/search/title/pride",
  //     {
  //       method: 'GET' // The type of HTTP request.
  //     }).then(res => {
  //       // Convert the response data to a JSON.
  //       return res.json();
  //     }, err => {
  //       // Print the error if there is one.
  //       console.log(err);
  //     }).then(bookList => {
  //       if (!bookList) return;
  //       // Map each categoryObj in searchList to an HTML element:
  //       // A button which triggers the showAllsections function for each genre.

  //       let bookDivs = bookList.rows.map((book, i) => (
  //         // <Button variant="contained" onClick={() => callAllSections(bookName)}>{bookName}</Button>
  //         console.log(book[4]),
  //         < Grid item key={book.isbn} xs={12} sm={6} md={4} >
  //           <Card className={classes.card}>
  //             <CardMedia
  //               className={classes.cardMedia}
  //               image={book[4]}
  //             />
  //             <CardContent className={classes.cardContent}>
  //               <Typography gutterBottom variant="h5" component="h2">
  //                 {book[1]}
  //               </Typography>
  //               <Typography>
  //                 {book[5]}
  //               </Typography>
  //             </CardContent>
  //             <CardActions>
  //               <Button size="small" color="primary">
  //                 {book[3]}
  //               </Button>
  //               <Button size="small" color="primary">
  //                 Edit
  //                   </Button>
  //             </CardActions>
  //           </Card>
  //         </Grid >
  //       ));

  //       // Set the state of the genres list to the value returned by the HTTP response from the server.
  //       setBooks(
  //         bookDivs
  //       );

  //     }, err => {
  //       // Print the error if there is one.
  //       console.log(err);
  //     });

  // });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Search Books' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <TextField
            name="searchText"
            variant="outlined"
            required
            fullWidth
            id="searchText"
            label="Search"
            autoFocus
            onKeyDown={keyPress}
            onChange={handleChange}
          />
          {/* <SearchBar
            name="searchText"
            variant="outlined"
            required
            fullWidth
            id="searchText"
            label="Search"
            autoFocus
            onBlur={handleChange
            }
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          /> */}
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {books}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
