import React, {useEffect} from 'react';
import './ConversationListItem.css';

const ConversationListItem = ({ user, userClickHandler, isActive, hasNewMessage }) => {

    let containerClasses = ["conversation-list-item"];
    if (isActive === true)
        containerClasses.push('active');

    return (
        <div
            key={user.userName}
            className={containerClasses.join(' ')}
            style={{ cursor: 'pointer' }}
            onClick={() => userClickHandler(user)}
        >
            {hasNewMessage ? <i className="fa fa-envelope" aria-hidden="true" style={{ color: 'red' }}></i> : null}

            <img className="conversation-photo" src={'https://cdn1.iconfinder.com/data/icons/users-and-groups/32/user-chat-02-512.png'} alt="conversation" />
            <div className="conversation-info">
                <h1 className="conversation-title">{user.userName}</h1>
            </div>
        </div>
    );
}

export default ConversationListItem;
