import { FileImageOutlined, GifOutlined, PlusCircleOutlined, SendOutlined, SmileOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Col, Row, Avatar, Tooltip, Input, Alert } from 'antd';
import React, { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import { addDocument } from '../../../firebase/services';
import useFireStore from '../../../Hooks/useFireStore';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import './ChatWindow.scss'
import Message from './Message/Message';

function ChatWindow(props) {
    const { selectedRoom, members } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const { setIsInviteMenberVisible } = useContext(AppContext)
    const [inputValue, setInputValue] = useState('')
    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id

    }), [selectedRoom.id])
    const messages = useFireStore('messages', condition)
    const handleOnchange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = async () => {

        if (inputValue) {

            addDocument('messages', {
                text: inputValue,
                uid: user.uid,
                photoURL: user.photoURL,
                roomId: selectedRoom.id,
                displayName: user.displayName,

            })
            setInputValue('')
        }
    }
    return (
        <div className="chat-window">
            {selectedRoom.id ? (

                <Row>
                    <Col span={24}>
                        <div className="chat-window-header">
                            <div className="chat-window-header-left">
                                <p className="chat-window-header-left-title">{selectedRoom && selectedRoom.name}</p>
                                <span className="chat-window-header-left-des">{selectedRoom && selectedRoom.description}</span>
                            </div>
                            <div className="chat-window-header-right">
                                <Tooltip title="Add New User" placement="top">
                                    <Button
                                        className="chat-window-header-right-btn"
                                        onClick={() => setIsInviteMenberVisible(true)}
                                        icon={<UserAddOutlined />}
                                        size="large"
                                        type="primary"
                                        shape="circle"
                                    />
                                </Tooltip>
                                <Avatar.Group
                                    size="large"
                                    maxCount={3}
                                    maxStyle={{
                                        color: '#fff',
                                        backgroundColor: '#1890ff',
                                    }}
                                >
                                    {members && members.length > 0 && members.map(member =>
                                        <Tooltip title={member.displayName} placement="top" key={member.uid}>
                                            <Avatar
                                                size="large"
                                                src={member.photoUrl}
                                            >
                                                {member.photoUrl ? '' : member.displayName.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    )}

                                </Avatar.Group>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="chat-window-content">
                            <div className="message-list">
                                {messages && messages.length > 0 && messages.map(message => (
                                    <Message
                                        key={message.roomId}
                                        text={message.text}
                                        displayName={message.displayName}
                                        photoURL={message.photoURL}
                                        createdAt={message.createdAt}
                                        isImessage={message.uid === user.uid}
                                    />)
                                )}
                                {/* <Message
                                    text="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor cum"
                                    displayName="Phạm Ngọc Hoàn"
                                    createdAt="21/02/2991 20:12"
                                    photoUrl="https://joeschmoe.io/api/v1/random"
                                />
                                <Message
                                    text="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor cum"
                                    displayName="Phạm Ngọc Hoàn"
                                    createdAt="21/02/2991 20:12"
                                    photoUrl="https://joeschmoe.io/api/v1/random"
                                    isImessage={true}
                                />
                                <Message
                                    text="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor cum"
                                    displayName="Phạm Ngọc Hoàn"
                                    createdAt="21/02/2991 20:12"
                                    photoUrl="https://joeschmoe.io/api/v1/random"
                                />
                                <Message
                                    text="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor cum"
                                    displayName="Phạm Ngọc Hoàn"
                                    createdAt="21/02/2991 20:12"
                                    photoUrl="https://joeschmoe.io/api/v1/random"
                                /> */}
                            </div>
                            <div className="message-footer">
                                <div className="message-footer-action">
                                    <Button
                                        className="message-footer-action-btn"
                                        icon={<PlusCircleOutlined />}
                                        size="large"
                                        type="text"
                                        shape="circle"
                                    />
                                    <Button
                                        className="message-footer-action-btn"
                                        icon={<FileImageOutlined />}
                                        size="large"
                                        type="text"
                                        shape="circle"
                                    />
                                    <Button
                                        className="message-footer-action-btn"
                                        icon={<SmileOutlined />}
                                        size="large"
                                        type="text"
                                        shape="circle"
                                    />
                                    <Button
                                        className="message-footer-action-btn"
                                        icon={<GifOutlined />}
                                        size="large"
                                        type="text"
                                        shape="circle"
                                    />
                                </div>
                                <div className="message-footer-form">
                                    <Input
                                        className="message-footer-form-input"
                                        onChange={handleOnchange}
                                        onPressEnter={handleOnSubmit}
                                        value={inputValue}
                                        placeholder="Aa" />
                                    <Button className="message-footer-form-submit"
                                        icon={<SendOutlined />}
                                        onClick={handleOnSubmit}
                                        size="large"
                                        type="primary"
                                        shape="circle"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) :
                <Alert
                    message="hãy chọn phòng"
                    type="info"
                    showIcon
                    style={{ margin: '5px' }}
                    closable
                />
            }
        </div >
    );
}

export default ChatWindow;