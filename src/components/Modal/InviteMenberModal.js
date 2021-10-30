import { Input, Modal, Form, Select, Spin, Avatar } from 'antd';
import React, { useContext, useState, useMemo } from 'react';
import { addDocument } from '../../firebase/services';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { debounce } from 'lodash'
import { db } from '../../firebase/config';
function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])
            setFetching(true)
            fetchOptions(value, props.currentMembers).then(newOptions => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='large' /> : null}
            {...props}
        >
            {options.map(option => (
                <Select.Option
                    key={option.value}
                    value={option.value}
                    title={option.label}
                >
                    <Avatar
                        style={{ marginRight: '5px' }}
                        size="large"
                        src={option.photoUrl}>
                        {option.photoUrl ? "" : option.label.chatAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${option.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}
function InviteMenberModal(props) {
    const { isInviteMenberVisible, setIsInviteMenberVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
    const [value, setValue] = useState([])
    const { user } = useContext(AuthContext)
    const [form] = Form.useForm();
    const fetchUserList = async (search, currentMembers) => {
        return await db.collection('users')
            .where('keywords', 'array-contains', search)
            .orderBy('displayName')
            .limit(20)
            .get()
            .then((snapshot) => {
                return snapshot.docs.map(doc => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoUrl: doc.data().photoUrl,
                })).filter(opt => currentMembers.includes(opt.value))
            })

    }
    const handleOk = () => {

        form.resetFields()
        //update member in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId)

        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })
        setIsInviteMenberVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsInviteMenberVisible(false)
    }
    return (
        <div>
            <Modal
                title="Tạo Phòng"
                visible={isInviteMenberVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label="Mời thêm thành viên" name='name'>
                        <DebounceSelect
                            mode="multiple"
                            label="Tên Thành Viên"
                            value={value}
                            placeholder="Nhập tên thành viên"
                            fetchOptions={fetchUserList}
                            onChange={newValue => setValue(newValue)}
                            style={{ width: "100%" }}
                            currentMembers={selectedRoom.members}
                        ></DebounceSelect>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default InviteMenberModal;