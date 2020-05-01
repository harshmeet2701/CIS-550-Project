import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const useStyles = makeStyles((theme) => ({
  cardDialog: {
    display: 'flex',
  },
  detailsDialog: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentDialog: {
    flex: '1 0 auto',
  },
  coverDialog: {
    width: 1000,
  },
  controlsDialog: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIconDialog: {
    height: 38,
    width: 38,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  cover: {
    width: 151,
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardRow: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Search() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [criteria, setCriteria] = React.useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [dialog, setDialogue] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const handleListItemClick = (book) => {
    setOpen1(true);
    setDialogue(book);
  };

  const handleChange = (event) => {
    var criteria = event.target.value;
    setCriteria(criteria);
  };

  const handleChangeSearch = (event1) => {
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

  const handleClose1 = () => {
    setOpen1(false);
  };

  function showTitle(searchCriteria) {
    fetch("http://localhost:8081/api/book/search/title/" + searchCriteria,
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

        let bookDivs = bookList.rows.map((book, i) => (
          < Grid item key={book.isbn} xs={12} sm={6} md={4} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card} style={{ width: '180px' }}>
              <CardMedia
                className={classes.cardMedia}
                image={book[4] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : book[4]} style={{ height: '300px', width: '175px' }}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom>
                  {book[1]}
                </Typography>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="bookmark">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                    onClick={() => handleListItemClick(book)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
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

  function showAuthors(searchCriteria) {
    console.log("Value " + searchCriteria);
    fetch("http://localhost:8081/api/book/search/author/" + searchCriteria,
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
        let authorDivs = authorList.rows.map((author, i) => (
          console.log(author[2]),
          < Grid item key={author.isbn} xs={12} sm={6} md={4} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card} style={{ width: '180px' }}>
              <CardMedia
                className={classes.cardMedia}
                image={author[4] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : author[4]} style={{ height: '300px', width: '175px' }}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom>
                  {author[1]}
                </Typography>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="bookmark">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                    onClick={() => handleListItemClick(author)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
          </Grid >
        ));

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
    fetch("http://localhost:8081/api/book/search/isbn/" + searchCriteria,
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

        let isbnDivs = isbnList.rows.map((isbn, i) => (
          console.log(isbn[4]),
          < Grid item key={isbn.isbn} xs={12} sm={6} md={4} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card} style={{ width: '180px' }}>
              <CardMedia
                className={classes.cardMedia}
                image={isbn[4] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : isbn[4]} style={{ height: '300px', width: '175px' }}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom>
                  {isbn[1]}
                </Typography>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="bookmark">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
                    onClick={() => handleListItemClick(isbn)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
          </Grid >
        ));

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
        <Container maxWidth="lg" className={classes.container}>
          <FormControl variant="filled" className={classes.formControl} justify="center">
            <InputLabel htmlFor="filled-age-native-simple">Select Search Criteria</InputLabel>
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
          <TextField
            name="searchText"
            variant="outlined"
            required
            fullWidth
            id="searchText"
            label="Search"
            autoFocus
            onKeyDown={keyPress}
            onChange={handleChangeSearch}
          />
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {books}
          </Grid>
          <Dialog onClose={handleClose1} aria-labelledby="customized-dialog-title" open={open1}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
            </DialogTitle>
            <DialogContent dividers style={{ width: '3500px' }}>
              <Card className={classes.cardDialog} style={{ height: '400px', width: '1500px' }}>
                <div className={classes.detailsDialog}>
                  <CardContent className={classes.contentDialog}>
                    <Typography component="h5" variant="h5">
                      {dialog[1]}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {dialog[2]}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {dialog[5]}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.coverDialog}
                  image={dialog[4] === null ? 'https://i.imgur.com/sJ3CT4V.gif' : dialog[4]}
                />
              </Card>
            </DialogContent>
          </Dialog>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
