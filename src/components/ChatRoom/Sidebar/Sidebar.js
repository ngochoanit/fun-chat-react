import { Col, Row } from 'antd';
import React from 'react';
import UserInfo from './UserInfo/UserInfo';
import RoomList from './RoomList/RoomList'
import './Sidebar.scss'

function Sidebar(props) {
    return (
        <div className="sidebar-wrap">
            <Row>
                <Col span={24}>
                    <UserInfo></UserInfo>
                </Col>
                <Col span={24}>
                    <RoomList></RoomList>
                </Col>
            </Row>
        </div>
    );
}

export default Sidebar;