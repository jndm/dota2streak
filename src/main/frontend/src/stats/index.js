import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '5vh'
    },
    card: {
        minWidth: 275,
        minHeight: 150,
        maxWidth: 375
    },
    win: {
        color: 'green !important',
    },
    lose: {
        color: 'red !important',
    }
});

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streak: null,
            error: null
        }
    }

    componentDidMount = async () => {
        try {

            let user = this.state.user;
            let response = null;
            let accountId = this.props.match.params.accountId;
            if(user == null) {
                if(this.props.user) {
                    user = this.props.user;
                } else {
                    response = await axios.get('/api/search-by-id', { params: { accountId } });
                    user = response.data;
                }
                this.setState({user});
            }

            response = await axios.get('/api/matches', { params: { accountId } });
            if(response.data == null) {
                throw new Error("Unable to find gaming history for id: ", );
            }
            this.setState({streak: response.data});
             /*
            var user = {
                account_id: 321545,
                personaname: 'jndm',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a2/a2b17ec4e4f84b2cde3428db15ecba3f38ec5b5a_full.jpg',
                last_match_time: null,
                similarity: 0
            }
            this.setState({user})
            var streak = {
                combinedStreak: {
                    win: false,
                    count: 6
                },
                rankedStreak: {
                    win: false,
                    count: 6
                },
                unrankedStreak: {
                    win: true,
                    count: 1
                },
                highestWinStreak: {
                    win: true,
                    count: 6
                },
                highestLoseStreak: {
                    win: false,
                    count: 9
                },
                highestRankedWinStreak: {
                    win: true,
                    count: 5
                },
                highestRankedLoseStreak: {
                    win: false,
                    count: 6
                },
                highestUnrankedWinStreak: {
                    win: true,
                    count: 5
                },
                highestUnrankedLoseStreak: {
                    win: false,
                    count: 7
                }
            };
            this.setState({streak});*/
        } catch (err) {
            this.setState({error: 'Failed to retrieve match history.'});
            console.log(err);
        }
    }

    getGridItem  = (classes, title, amount, win) => {
        return (
            <Grid item xs={12} md={6} lg={4}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" color="textPrimary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h2" align="center" classes={{h2: win ? classes.win : classes.lose}}>
                            {amount} {win ? ' wins' : ' losses'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        let {streak, user} = this.state;
        let {classes} = this.props;

        if (this.state.error) {
            return (
                <Grid container justify='center' alignItems='center' className={classes.root}>
                    <Grid item xs={12}>
                        <Typography align='center' color="textPrimary" variant="h2">Failed to retrieve user's match history.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align='center' color="textPrimary" variant="h2">Please try again later.</Typography>
                    </Grid>
                </Grid>
            );
        }

        if (!user || !streak) {
            return (
                <Grid container direction='column' alignItems='center' className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container direction='row' alignItems='center'>
                            <FontAwesomeIcon className="loading" icon="spinner" size="5x"/>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: 50}}>
                <Grid item xs={12} lg={8}>
                    <Grid container direction="row" spacing={32} alignItems="center" justify="center">
                        <Grid item>
                            <img src={user.avatarfull} alt="avatar"/>
                        </Grid>
                        <Grid item>
                            <Typography color="textPrimary" variant="h1">{user.personaname}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={9} md={9} lg={9} container spacing={32} alignItems="flex-start" style={{margin: '20px 0 5px 0'}}>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h4">Current</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={9} md={9} lg={9} container direction="row" spacing={32} justify="center">
                    {this.getGridItem(classes, 'Ranked', streak.rankedStreak.count, streak.rankedStreak.win)}
                    {this.getGridItem(classes, 'Unranked', streak.unrankedStreak.count, streak.unrankedStreak.win)}
                    {this.getGridItem(classes, 'Combined', streak.combinedStreak.count, streak.combinedStreak.win)}
                    <Grid item xs={false} md={6} lg={false} style={{padding: 0}}/>
                </Grid>

                <Grid item xs={12} sm={9} md={9} lg={9} container spacing={32} alignItems="flex-start" style={{margin: '20px 0 5px 0'}}>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="h4">All Time Highest</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={9} md={9} lg={9} container direction="row" spacing={32} justify="center">
                    {this.getGridItem(classes, 'Ranked', streak.highestRankedWinStreak.count, true)}
                    {this.getGridItem(classes, 'Ranked', streak.highestRankedLoseStreak.count, false)}
                    {this.getGridItem(classes, 'Unranked', streak.highestUnrankedWinStreak.count, true)}
                    {this.getGridItem(classes, 'Unranked', streak.highestUnrankedLoseStreak.count, false)}
                    {this.getGridItem(classes, 'Combined', streak.highestWinStreak.count, true)}
                    {this.getGridItem(classes, 'Combined', streak.highestLoseStreak.count, false)}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Stats);