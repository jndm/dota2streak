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
           main: '#243447',
           dark: '#141d26',
           contrastText: '#6495ED'
        },
        background: {
           paper: '#141d26',
           default: '#141d26'
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
                backgroundColor: '#243447'
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
                                <Grid item xs={10}>
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
