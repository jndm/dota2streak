import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        margin: '0 1vh',
        width: '80px',
        height: '80px',
    }
})

class SearchResults extends Component {
    getCard = (classes, user) => {
        return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={user.account_id}>
                <Paper onClick={() => this.props.onSelectUser(user)}>
                    <Grid container direction="row" alignItems="center" style={{height: 100}}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <img className={classes.image} src={user.avatarfull} alt="avatar"/>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                            <Typography variant="h5" color="textPrimary" noWrap style={{marginLeft: '10px'}}>
                                {user.personaname}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    render() {
        const { classes, users, loading } = this.props;

        if(loading) {
            return (
                <Grid item xs={12} container direction='column' alignItems='center' justify="center" style={{marginTop: '5vh'}}>
                    <FontAwesomeIcon className="loading" icon="spinner" size="4x"/>
                </Grid>
            );
        }

        if(!users) {
            return null;
        }

        if(users.length === 0) {
            return (
                <Grid item xs={12} container justify="center" alignItems="center" style={{marginTop: 30}}>
                    <Grid item xs={12}>
                        <Typography align='center' color="textPrimary" variant="h4">Could not find account.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center' color="textPrimary" variant="h4">Please try different name.</Typography>
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid item xs={12} sm={9} md={11} lg={11} container justify="flex-start" alignItems="flex-start" style={{marginTop: 30}} spacing={32}>
                {users.map(user => {
                   return this.getCard(classes, user);
                })}
            </Grid>
        );
    }
};

export default withStyles(styles)(SearchResults);