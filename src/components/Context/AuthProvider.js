import { auth } from '../../firebase/config';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd'

export const AuthContext = React.createContext()
function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();
    useEffect(() => {
        const unsubcibed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUser({
                    displayName, email, uid, photoURL
                });
                setIsLoading(false)
                history.push('/')
                return
            }
            setIsLoading(false)
            history.push('/login')
        })
        // clean function
        return () => {
            unsubcibed()
        }
    }, [history])
    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;