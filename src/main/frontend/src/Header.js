import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
        height: '70px'
    },
}

const Header = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component={Link} to='/search' color="inherit" variant="h6">
                        Dota 2 Streak
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);