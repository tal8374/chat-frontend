import React, { useState, useEffect } from 'react';
import InputText from '../../components/InputText/InputText'
import ConversationListItem from '../ConversationListItem/ConversationListItem'
import Header from '../../components/Header/Header'
import './ConversationList.css'

const ConversationList = ({ activeUsers, userClickHandler, chosenUser, unreadMessages }) => {

    const [shownUsers, setShownUsers] = useState(activeUsers);

    useEffect(() => {
        setShownUsers(activeUsers)
    }, [activeUsers])

    function onSearchChange(searchInput) {
        searchInput = searchInput.trim();
        setShownUsers(activeUsers.filter(user => user.userName.trim().toLowerCase().indexOf(searchInput.toLowerCase()) !== -1));
    }

    return (
        <div className="conversation-list container">
            <Header text="Active Users" ></Header>

            <InputText onChangeHandler={onSearchChange} placeholder='Search users' />

            {
                shownUsers ?
                    shownUsers.map((user) =>
                        <ConversationListItem
                            isActive={chosenUser ? user.socketId === chosenUser.socketId : false}
                            hasNewMessage={unreadMessages.filter(message => (message.createdBy == user.userName)).length > 0}
                            user={user}
                            userClickHandler={() => userClickHandler(user)}
                        />
                    )
                    :
                    null
            }
        </div>
    );
}

export default ConversationList;
