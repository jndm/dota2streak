import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchResult from './SearchResults';
import axios from "axios/index";

const styles = theme => ({
    button: {
        width: '100%',
        maxWidth: '100px',
        marginTop: theme.spacing.unit * 2
    }
})

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            loading: false,
            users: null
        }
    }

    getUserInfo = async (name) => {
        try {
            this.setState({loading: true});
            let response = await axios.get("/api/search-by-name", { params: { name } });
            let users = response.data ? response.data : [];
            this.setState({loading: false, users });
        } catch (err) {
            this.setState({loading: false});
            console.log(err);
        }
/*
        var data = [
            {
                account_id: 321545,
                personaname: 'sanslubricantassad',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a2/a2b17ec4e4f84b2cde3428db15ecba3f38ec5b5a_full.jpg',
                last_match_time: '2018-10-09T19:20:18.000Z',
                similarity: 29.68564
            },
            {
                account_id: 843451639,
                personaname: 'sans lubricant asdasd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                last_match_time: null,
                similarity: 17.892166
            },
            {
                account_id: 879982877,
                personaname: 'jndi',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                last_match_time: null,
                similarity: 17.892166
            },
            {
                account_id: 843502615,
                personaname: 'mjnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
                last_match_time: null,
                similarity: 17.430876
            },
            {
                account_id: 837925546,
                personaname: 'mjnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a52046e37e839e90b22f872834cd3728a1904f4d_full.jpg',
                last_match_time: null,
                similarity: 17.430876
            },
            {
                account_id: 132714483,
                personaname: 'Wjnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f8/f8d030cb3eff280b28721896b665d2d1ef202635_full.jpg',
                last_match_time: '2018-10-12T06:28:48.000Z',
                similarity: 17.033373
            },
            {
                account_id: 851687656,
                personaname: 'mjnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3d/3d0b1af46ad78bdd6ef7b31b4a2fd62315f5a49c_full.jpg',
                last_match_time: null,
                similarity: 17.033373
            },
            {
                account_id: 849359054,
                personaname: 'mjnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1f/1fa4128491b0b66bd05ac97574dea70db51d1b7b_full.jpg',
                last_match_time: null,
                similarity: 16.934605
            },
            {
                account_id: 4800855,
                personaname: 'Majnd',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/37/37a06b978698416badb3e3f5993ece963b4b56a7_full.jpg',
                last_match_time: null,
                similarity: 15.751529
            },
            {
                account_id: 164576330,
                personaname: 'jndlao',
                avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/cc/cc5f09d7e424d096b06cef6d433e389335e30e4d_full.jpg',
                last_match_time: null,
                similarity: 14.984186
            }
        ];

        this.setState({users: data});*/
    }

    onKeyPress = (target) => {
        if(this.props.loading) {
            return;
        }

        if(target.charCode === 13) {
            this.onClickSearch();
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onClickSearch = () => {
        this.getUserInfo(this.state.name);
    }

    onSelectUser = (user) => {
        this.props.setSelectedUser(user);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="column" justify="flex-start" alignItems="center" style={{marginTop: 30}}>
                <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h1">
                        Search
                    </Typography>
                </Grid>
                <Grid container justify="center" spacing={16}>
                    <Grid item xs={7} sm={6} md={5} lg={4}>
                        <TextField
                            id="filled-name-input"
                            label="Nickname"
                            type="text"
                            name="nickname"
                            fullWidth={true}
                            value={this.state.name}
                            onChange={this.onChangeName}
                            onKeyPress={this.onKeyPress}
                            margin="none"
                        />
                    </Grid>
                    <Grid item xs={2} sm={1} md={1} lg={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.onClickSearch}
                            disabled={this.state.loading || !this.state.name}>
                            {!this.state.loading
                                ? <FontAwesomeIcon icon='search' size="2x"/>
                                : <FontAwesomeIcon className="loading" icon="spinner" size="2x"/>
                            }
                        </Button>
                    </Grid>
                </Grid>
                <SearchResult users={this.state.users} onSelectUser={this.onSelectUser} loading={this.state.loading}/>
            </Grid>
        );
    }
};

export default withStyles(styles)(Stats);