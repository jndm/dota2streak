import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.css';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            loading: false
        }
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
        this.props.getUserInfo(this.state.name);
    }

    render() {
        console.log(this.props.loading);
        return (
            <div className="search-container">
                <div className="title">
                    <label htmlFor="name">Dota 2 Name</label>
                </div>
                <div>
                    <input className="input" type="text" name="name" value={this.state.name} onChange={this.onChangeName} onKeyPress={this.onKeyPress}/>
                    <button className="searchButton" onClick={this.onClickSearch} disabled={this.props.loading}>
                        {!this.props.loading
                            ? <FontAwesomeIcon icon='search' size="2x"/>
                            : <FontAwesomeIcon className="loading" icon="spinner" size="2x"/>
                        }
                    </button>
                </div>
            </div>
        );
    }
};

export default Stats;