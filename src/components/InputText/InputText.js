import React, { Component } from 'react';
import './InputText.css';

export default class InputText extends Component {

    onChangeHandler(event) {
        if (this.props.onChangeHandler)
            this.props.onChangeHandler(event.target.value);
    }

    onKeyPressHandler(event) {
        if (this.props.onKeyPressHandler)
            this.props.onKeyPressHandler(event.charCode);
    }

    render() {
        return (
            <div className="input-text-container">
                <input
                    type="search"
                    className="input-text"
                    placeholder={this.props.placeholder}
                    onChange={this.onChangeHandler.bind(this)}
                    onKeyPress={this.onKeyPressHandler.bind(this)}
                    value={this.props.value}
                />
            </div>
        );
    }
}
