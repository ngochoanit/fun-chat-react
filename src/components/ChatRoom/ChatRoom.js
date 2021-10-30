import { Row, Col } from 'antd';
import React from 'react';
import ChatWindow from './ChatWindow/ChatWindow';
import Sidebar from './Sidebar/Sidebar';

function ChatRoom(props) {

    return (
        <Row>
            <Col span={6} >
                <Sidebar></Sidebar>
            </Col>
            <Col span={18} >
                <ChatWindow></ChatWindow>
            </Col>
        </Row >
    );
}

export default ChatRoom;