import { Input, Modal, Form } from 'antd';
import React, { useContext } from 'react';
import { addDocument } from '../../firebase/services';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';

function AddRoomModal(props) {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const [form] = Form.useForm();
    const handleOk = () => {
        //add new room to firestore
        addDocument('rooms', { ...form.getFieldsValue(), members: [user.uid] })
        //reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    }
    return (
        <div>
            <Modal
                title="Tạo Phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label="Tên Phòng" name='name'>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <Input.TextArea placeholder="Mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;