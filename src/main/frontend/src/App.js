import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { library }  from '@fortawesome/fontawesome-svg-core';
import { faSearch, faAngleDoubleLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Search from './search';
import Stats from './stats';
import { withRouter } from 'react-router-dom';

library.add(faSearch, faAngleDoubleLeft, faSpinner);

class App extends Component {
    constructor() {
        super();
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
        return (
            <div className="content">
                <Switch>
                    <Route exact path='/stats/:accountId' render={(props) => <Stats {...props} user={this.state.user}/>} />
                    <Route path='/' render={(props) => <Search {...props} getUserInfo={this.getUserInfo} loading={this.state.loading} />} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
