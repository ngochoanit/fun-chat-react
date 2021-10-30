import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppProvider';
import './RoomList.scss'

const { Panel } = Collapse;

function RoomList(props) {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext)

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }
    return (
        <Collapse ghost destroyInactivePanel={[1]}>
            <Panel className="roomlist-wrap" header="Danh sách các phòng" key="1">
                {
                    rooms && rooms.length > 0 && rooms.map(room =>
                        <Typography.Link
                            className="room-item-link"
                            key={room.id}
                            onClick={() => setSelectedRoomId(room.id)}
                        >{room.name}</Typography.Link>
                    )
                }
                <Button
                    className=" add-room"
                    type="text"
                    icon={<PlusCircleOutlined />}
                    onClick={handleAddRoom}
                >
                    Thêm Phòng
                </Button>
            </Panel>
        </Collapse>
    )
}

export default RoomList;