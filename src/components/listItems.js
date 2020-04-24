import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TheatersIcon from '@material-ui/icons/Theaters';
import CategoryIcon from '@material-ui/icons/Category';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {NavLink} from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} to="/search" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>

    <ListItem button component={NavLink} to="/dashboard" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    
    <ListItem button component={NavLink} to="/bestseller" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Best Seller" />
    </ListItem>

    <ListItem button component={NavLink} to="/movies" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <TheatersIcon />
      </ListItemIcon>
      <ListItemText primary="Movies" />
    </ListItem>

    <ListItem button component={NavLink} to="/categories" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>

    <ListItem button component={NavLink} to="/recommended" activeClassName="Mui-selected" exact>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Recommended Books" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Profile Settings</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);

