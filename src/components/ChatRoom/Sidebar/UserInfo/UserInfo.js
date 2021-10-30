import { Avatar, Button, Space, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { auth } from '../../../../firebase/config'
import { AuthContext } from '../../../Context/AuthProvider'
import './UserInfo.scss'

function UserInfo() {
    // useEffect(() => {
    //     db.collection('users').onSnapshot((snapshot) => {
    //         const data = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }))
    //     })
    // }, [])
    const { user } = useContext(AuthContext)

    const handleLogout = () => {
        auth.signOut();
    }
    return (
        <div className="user-wrap">
            <Space>
                <Avatar className="user-avatar" size={40} src={user.photoURL} />
                <Typography.Text className="user-name">{user.displayName}</Typography.Text>
            </Space>
            <Button
                onClick={handleLogout}
                size="large"
                danger
                shape="circle"
                icon={<LoginOutlined />}
            >
            </Button>
        </div>

    );
}

export default UserInfo;