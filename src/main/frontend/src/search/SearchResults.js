import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    image: {
        margin: '0 1vh',
        width: '80px',
        height: '80px',
    }
})

class SearchResults extends Component {
    constructor(props) {
        super(props)
    }

    getCard = (classes, user) => {
        return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={user.account_id}>
                <Paper>
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
        const { classes, users } = this.props;

        if(!users) {
            return null;
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