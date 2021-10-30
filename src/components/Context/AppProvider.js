import React, { useContext, useMemo, useState } from 'react';
import useFireStore from '../../Hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext()
function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMenberVisible, setIsInviteMenberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const { user } = useContext(AuthContext)
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid
        }
    }, [user.uid])
    const rooms = useFireStore('rooms', roomsCondition)

    const selectedRoom = useMemo(
        () => rooms.find(room => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    )
    const userCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        }
    }, [selectedRoom.members])
    const members = useFireStore('users', userCondition)
    console.log(members)
    return (
        <AppContext.Provider
            value={
                {
                    rooms,
                    isAddRoomVisible,
                    setIsAddRoomVisible,
                    selectedRoomId,
                    setSelectedRoomId,
                    selectedRoom,
                    members,
                    isInviteMenberVisible,
                    setIsInviteMenberVisible,
                }
            }>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;