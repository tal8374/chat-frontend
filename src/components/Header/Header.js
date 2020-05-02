import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {

    render() {
        return (
            <h4 className="header">{this.props.text}</h4>
        );
    }
}
