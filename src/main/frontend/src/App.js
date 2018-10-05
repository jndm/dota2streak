import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faSearch, faAngleDoubleLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from './Header';
import Search from './search';
import Stats from './stats';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
           light: '#6495ED',
           main: '#141d26',
           dark: '#243447',
           contrastText: '#6495ED'
        },
        background: {
           paper: '#243447',
           default: '#243447'
        },
        text: {
           primary: '#6495ED'
        },
        border: {
            primary: '#6495ED'
        },
        action: {
            disabledBackground: '#1f2c3f',
            disabled: '#6495ED',
        }
   },
    overrides: {
        MuiInput: {
            underline: {
                '&:before':{
                    borderBottom: '1px solid #6495ED'
                }
            }
        },
        MuiFormLabel: {
            root: {
                color: '#6495ED'
            }
        },
        MuiButton: {
            containedPrimary: {
                backgroundColor: '#1f2c3f'
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#141d26'
            }
        }
    }
});

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
    },
    contentContainer: {
        width: '100%',
    }
});

library.add(faSearch, faAngleDoubleLeft, faSpinner);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: false
        }
    }

    getUserInfo = async (name) => {
        try {
            this.setState({loading: true});
            let response = await axios.get("/search-by-name", { params: { name } });
            this.setState({loading: false});

            if(response.data == null || response.data.account_id == null) {
                throw new Error("User not found with name: ", name);
            }
            this.setState({user: response.data});
            this.props.history.push(`/stats/${response.data.account_id}`);
        } catch (err) {
            this.setState({loading: false});
            console.log(err);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline />
                    <div className={classes.root}>
                        <Header/>
                        <div className={classes.contentContainer}>
                            <Grid container direction="row" justify="center">
                                <Grid item xs={8}>
                                    <Switch>
                                        <Route exact path='/stats/:accountId' render={(props) => <Stats {...props} user={this.state.user}/>} />
                                        <Route path='/' render={(props) => <Search {...props} getUserInfo={this.getUserInfo} loading={this.state.loading} />} />
                                    </Switch>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withRouter(App));
