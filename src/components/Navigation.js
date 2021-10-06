// Navigation.js
import React from 'react';
import './Navigation.scss'

class Navigation extends React.Component {
    render() {
        return (
            <nav className="nav">
                {this.props.children}
            </nav>
        );
    }
}

export default Navigation;