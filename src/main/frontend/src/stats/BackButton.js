import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="back-button">
            <Link to="/search">
                <FontAwesomeIcon icon='angle-double-left'/>
                <span>&nbsp;New search</span>
            </Link>
        </div>
    );
}