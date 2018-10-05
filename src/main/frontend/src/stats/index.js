import React, {Component} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// import './index.css';
import ErrorMessage from "./ErrorMessage";
import BackButton from "./BackButton";

const styles = theme => ({
    card: {
        minWidth: 275,
        minHeight: 150,
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
            /*
            let user = this.state.user;
            let response = null;
            let accountId = this.props.match.params.accountId;
            if(user == null) {
                if(this.props.user) {
                    user = this.props.user;
                } else {
                    response = await axios.get('/search-by-id', { params: { accountId } });
                    user = response.data;
                }
                this.setState({user});
            }

            response = await axios.get('/matches', { params: { accountId } });
            if(response.data == null) {
                throw new Error("Unable to find gaming history for id: ", );
            }
            this.setState({streak: response.data});
            */
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
            this.setState({streak});
        } catch (err) {
            this.setState({error: 'Failed to retrieve match history.'});
            console.log(err);
        }
    }

    render() {
        let {streak, user} = this.state;
        let {classes} = this.props;

        if (this.state.error) {
            return (
                <div className="stats-container">
                    <BackButton/>
                    <ErrorMessage/>
                </div>
            );
        }

        if (!user || !streak) {
            return (
                <div className="stats-container">
                    <FontAwesomeIcon className="loading" icon="spinner" size="5x"/>
                </div>
            );
        }

        return (
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                    <Grid container direction="row" spacing={32}>
                        <Grid item>
                            <img src={user.avatarfull} alt="avatar"/>
                        </Grid>
                        <Grid item>
                            <Typography color="textPrimary" variant="display4">{user.personaname}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing={32}>
                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        Current combined streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.combinedStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        Current ranked streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.rankedStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        Current combined streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.unrankedStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest combined winning streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestWinStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest combined losing streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestLoseStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest ranked winning streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestRankedWinStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest ranked losing streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestRankedLoseStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest unranked winning streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestUnrankedWinStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="headline" component="h2" color="textPrimary">
                                        All time highest unranked losing streak
                                    </Typography>
                                    <Typography variant="headline" component="h1" color="textPrimary">
                                        {streak.highestUnrankedLoseStreak.count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Stats);