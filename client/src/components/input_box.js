import React, { Component, useState } from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    placeholder='Search for an item'
                />
            </div>
        );
    }
}
export default InputBox;
