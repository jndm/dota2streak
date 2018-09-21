import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Search from './search';
import Stats from './stats';
import { withRouter } from 'react-router-dom';

library.add(faSearch);

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
        }
    }

    getUserInfo = async (name) => {
        try {
            this.setState({loading: true});
            let response = await axios.get("/search", { params: { name } });
            this.setState({loading: false});

            if(response.data == null || response.data.account_id == null) {
                throw new Error("User not found with name: ", name);
            }
            this.props.history.push(`/stats/${response.data.account_id}`);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path='/stats/:accountId' render={(props) => <Stats {...props} />} />
                <Route path='/' render={(props) => <Search {...props} getUserInfo={this.getUserInfo} loading={this.state.loading} />} />
            </Switch>
        );
    }
}

export default withRouter(App);
