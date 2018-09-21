import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            loading: false
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
        return (
            <div>
                <h1>Search</h1>
                <input type="text" name="name" value={this.state.name} onChange={this.onChangeName}/>
                <button onClick={this.onClickSearch} disabled={this.props.loading}>
                    <FontAwesomeIcon icon='search' />
                </button>
            </div>
        );
    }
};

export default Stats;