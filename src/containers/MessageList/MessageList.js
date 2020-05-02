import React, { useState, useEffect } from 'react';
import Message from '../Message/Message'
import InputText from '../../components/InputText/InputText'
import Header from '../../components/Header/Header'
import './MessageList.css'
import moment from 'moment'

const Messanger = ({ chosenUser, createMessageHandler, messages, loggedInUserName }) => {

    const [text, setText] = useState('');

    useEffect(() => {
        scrollToBottom();
    }, [1]);

    function renderMessages() {
        let messageElements = [];
        let i = 0;
        let messageCount = messages.length;

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
            let isMine = current.createdBy === loggedInUserName;
            let currentMoment = current.timestamp;
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = previous.timestamp;
                let previousDuration = moment.duration(currentMoment - previousMoment);
                prevBySameAuthor = previous.createdBy === current.createdBy;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = next.timestamp;
                let nextDuration = moment.duration(nextMoment - currentMoment);
                nextBySameAuthor = next.createdBy === current.createdBy;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            messageElements.push(
                <Message
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    timestamp={current.timestamp}
                    text={current.text}
                />
            );

            i += 1;
        }

        return messageElements;
    }

    function onChangeHandler(text) {
        setText(text);
    }

    function onKeyPressHandler(keyCode) {
        switch (keyCode) {
            case 13:
                addNewMessageHandler();
                break;

            default:
                break;
        }
    }

    function addNewMessageHandler() {
        if (text.trim().length === 0)
            return;

        createMessageHandler(text);
        setText('');
    }



    function scrollToBottom() {
        if (chosenUser)
            document.getElementById('lastMessage').scrollIntoView();
    }

    return (

        <React.Fragment>
            {
                chosenUser ?
                    <div className="messanger-container">
                        <Header
                            className="messanger-header"
                            text={chosenUser.userName}
                        ></Header>
                        <div className="messanger-body">
                            {renderMessages()}
                            <span id="lastMessage"></span>
                        </div>
                        <InputText
                            className="messanger-footer"
                            onChangeHandler={onChangeHandler}
                            onKeyPressHandler={onKeyPressHandler}
                            placeholder='Type a message...'
                            value={text}
                        />
                    </div>
                    :
                    null
            }



        </React.Fragment>

    );
}

export default Messanger;
