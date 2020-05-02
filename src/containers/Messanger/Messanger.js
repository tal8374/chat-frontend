import React, { useState, useEffect } from 'react';
import './Messanger.css'
import { withRouter } from "react-router-dom";
import ConversationList from '../ConversationList/ConversationList'
import MessageList from '../MessageList/MessageList'
import queryString from 'query-string'
import io from "socket.io-client";
let socket = io(`https://chat-backend-tal8374.herokuapp.com/`);

const Messanger = ({ location, history }) => {

    let userName = queryString.parse(location.search).userName;
    if (!userName || userName.trim() === 0)
        history.push("/");

    const [chosenUser, setChosenUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);

    useEffect(() => {
        socket.on('serverMessage', ({ createdBy, message, timestamp }) => {
            let newMessage = { text: message, timestamp: timestamp, createdBy: createdBy, createdTo: userName };
            setMessages([...messages, newMessage]);

            let activeUserIndex = activeUsers.findIndex(user => user.userName === createdBy && createdBy != chosenUser);
            if (activeUserIndex != -1) {
                setActiveUsers(activeUsers);
                activeUsers[activeUserIndex].hasNewMessage = true;
            }

            if (chosenUser == null || chosenUser.userName !== createdBy) {
                setUnreadMessages([...unreadMessages, newMessage]);
            }
        });

        socket.on('activeUsers', (result) => {
            setActiveUsers(result.activeUsers.filter(activeUser => activeUser.userName !== userName));
        });

        socket.on('userName-request', () => {
            socket.emit('userName-answer', { userName }, (error) => { });
        });

        return () => {
            socket.emit('disconnected', { userName }, (error) => { });
            socket.off()
        };
    }, [chosenUser, messages])

    function userClickHandler(user) {
        setChosenUser(user);
        setUnreadMessages(unreadMessages.filter(unreadMessage => unreadMessage.createdBy != user.userName));
    }

    function createMessageHandler(message) {
        let timestamp = new Date();
        setMessages([...messages, { text: message, timestamp: timestamp, createdBy: userName, createdTo: chosenUser.userName }]);
        socket.emit('message', { createdBy: userName, message: message, targetUser: chosenUser, timestamp: timestamp }, (error) => { });
    }

    return (
        <div className="messenger" style={{ maxHeight: '850px' }}>
            <div className="scrollable sidebar">
                <ConversationList
                    activeUsers={activeUsers}
                    chosenUser={chosenUser}
                    userClickHandler={userClickHandler}
                    unreadMessages={unreadMessages}
                />
            </div>

            <div className="scrollable content">
                <MessageList
                    chosenUser={chosenUser}
                    messages={messages.filter(message => chosenUser && (message.createdBy == chosenUser.userName || message.createdTo == chosenUser.userName))}
                    createMessageHandler={createMessageHandler}
                    loggedInUserName={userName}
                />
            </div>
        </div>
    );
}

export default withRouter(Messanger);
