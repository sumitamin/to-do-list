import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:0
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export const Header = () => {
    const classes = useStyles();

    const logout = () => {
      localStorage.removeItem('utoken')
      window.location.href='/login'   
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                      To Do Manager
                  </Typography>
                  { localStorage.getItem('utoken') &&
                  <Button color="inherit" onClick={logout}>Logout</Button>
                  }
                </Toolbar>
            </AppBar>
        </div>
    )
}