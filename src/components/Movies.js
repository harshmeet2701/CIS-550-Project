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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const columns = [
  { id: 'isbn', label: 'ISBN', minWidth: 70 },
  { id: 'bookTitle', label: 'Book Title', minWidth: 120 },
  { id: 'bookAuthor', label: 'Author', minWidth: 70 },
  { id: 'movieTitle', label: 'Movie Title', minWidth: 120 },
  { id: 'movieYear', label: 'Movie Release Year', minWidth: 50 },
  { id: 'bookUrl', label: 'Book URL', minWidth: 70 },
];

function createData(isbn, bookTitle, bookAuthor, movieTitle, movieYear, bookUrl) {
  return { isbn, bookTitle, bookAuthor, movieTitle, movieYear, bookUrl };
}

const rows = [];

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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [columnValue, setColumnValue] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [rowsList, setRowsList] = React.useState([]);

  const handleColumnSelection = (event) => {
    setColumnValue(event.target.value);
  };

  const handleQuerySearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
    changeDataOnFilter();
  };

  const changeDataOnFilter = () => {
    if (columnValue != 'None' && searchText != '') {
      var tempObj = Object.values(rows).filter(x => x[columnValue].toLowerCase().indexOf(searchText.toLowerCase()) != -1);
      setRowsList(tempObj);
    }

    else
      setRowsList(rows);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/api/book/movies",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(moviesList => {
        if (!moviesList) return;
        // Map each categoryObj in searchList to an HTML element:
        // A button which triggers the showAllsections function for each genre.

        let movieDivs = moviesList.rows.map((movie, i) => (
          // <Button variant="contained" onClick={() => callAllSections(bookName)}>{bookName}</Button>
          console.log(movie[0]),
          console.log(movie[1]),
          console.log(movie[2]),
          console.log(movie[3]),
          console.log(movie[4]),
          rows.push(createData(movie[0], movie[1], movie[2], movie[3], movie[4], "https://www.bookdepository.com" + movie[5]))
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        setRowsList(
          rows
        );

      }, err => {
        // Print the error if there is one.
        console.log(err);
      });

  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Movie Adapted Books' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
            <FormControl variant="outlined" className={classes.formControl} stickyHeader aria-label="sticky table">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-outlined-label">Filter on</InputLabel>
                  <Select
                    style={{ width: '200px' }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={columnValue}
                    onChange={handleColumnSelection}
                    label="Column"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'isbn'}>ISBN</MenuItem>
                    <MenuItem value={'bookTitle'}>Book Title</MenuItem>
                    <MenuItem value={'bookAuthor'}>Book Author</MenuItem>
                    <MenuItem value={'movieTitle'}>Movie Title</MenuItem>
                    <MenuItem value={'releaseYear'}>Movie Release Year</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="searchText"
                    variant="outlined"
                    required
                    fullWidth
                    id="searchText"
                    label="Query"
                    autoFocus
                    onChange={handleQuerySearch}
                  />
                </Grid>
              </Grid>
            </FormControl>

            <TableContainer className={classes.container}>
              <Table>
                <TableHead stickyHeader aria-label="sticky table">
                  <TableRow >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[50, 100, 150]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div >
  );
}
