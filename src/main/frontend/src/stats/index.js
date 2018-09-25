import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';
import ErrorMessage from "./ErrorMessage";
import BackButton from "./BackButton";

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
        } catch(err) {
            this.setState({error: 'Failed to retrieve match history.'});
            console.log(err);
        }
    }

    getTableRow = (title, streak) => {
        if(!streak) {
            return null;
        }
        return (
            <tr>
                <td>{title}</td>
                <td className={streak.win ? 'win' : 'lose'}>{streak.win ? 'Winning Streak' : 'Losing Streak'}</td>
                <td className={streak.win ? 'win' : 'lose'}>{streak.count}</td>
            </tr>
        );
    }

    render() {
        let streak = this.state.streak;
        let user = this.state.user;

        if(this.state.error) {
            return (
                <div className="stats-container">
                    <BackButton />
                    <ErrorMessage />
                </div>
            );
        }

        if(!user || !streak) {
            return (
                <div className="stats-container">
                    <FontAwesomeIcon className="loading" icon="spinner" size="5x"/>
                </div>
            );
        }

        return (
            <div className="stats-container">
                <BackButton />
                <div className="user-card">
                    <img src={user.avatarfull} alt="avatar" />
                    <span className="username">{user.personaname}</span>
                </div>
                <div className="stats-table-container">
                    <table className="stats-table">
                        <tbody>
                            {this.getTableRow("All Games", streak.combinedStreak)}
                            {this.getTableRow("Ranked", streak.rankedStreak)}
                            {this.getTableRow("Unranked", streak.unrankedStreak)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Stats;