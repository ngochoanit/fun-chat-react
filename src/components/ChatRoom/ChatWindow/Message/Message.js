import { Avatar } from 'antd';
import { formatRelative } from 'date-fns';
import React from 'react';
import './Message.scss'

const formatDate = (seconds) => {
    let formatedDate = ''
    if (seconds) {
        formatedDate = formatRelative(new Date(seconds * 1000), new Date())
        formatedDate = formatedDate.charAt(0).toLocaleLowerCase() + formatedDate.slice(1)
    }
    return formatedDate
}

function Message(props) {
    const { text, displayName, createdAt, photoURL, isImessage } = props;
    return (
        <div className="message-item-container">
            <div className={isImessage ? "message-item imessage-item" : "message-item"} >

                <Avatar className="message-item-avatar"
                    size="large"
                    src={photoURL}
                >
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="message-item-content">
                    <div className="message-item-content-header">
                        <span className="message-item-content-header-name">{displayName}</span>
                        <span className="message-item-content-header-createdat">{formatDate(createdAt?.seconds)}</span>
                    </div>
                    <div className="message-item-content-body">
                        <p className="message-item-content-body-text">{text}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Message;