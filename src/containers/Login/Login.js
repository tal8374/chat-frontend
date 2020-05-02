import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Login.css'

const Login = ({ history }) => {

    const [userName, setUserName] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if (userName.length > 0)
            history.push(`/messanger?userName=${userName}`);
    }

    function onChangeField(event) {
        setUserName(event.target.value.trim());
    }

    return (
        <div className="login-container">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="userName"
                        onChange={onChangeField}
                        value={userName}
                        required
                    />
                </Form.Group>

                <Button onClick={onSubmit} variant="primary" type="submit" block>
                    Enter
                </Button>
            </Form>
        </div>
    );
}

export default withRouter(Login);
