import React from 'react';
import { Row, Col, Button, Typography, Avatar } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';
import './Login.scss'
import gglogo from '../../google.png'
import logo from '../../logo512.png'
import fblogo from '../../facebook.png'
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

function Login(props) {

    const handleLoginFb = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoUrl: user.photoURL,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)

            })
        }
    }

    const handleLoginGg = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider)

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoUrl: user.photoURL,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }


    return (
        <div className="login">
            <div className="login-wrap">
                <div className="login-header">
                    <Avatar className="login-header-img"
                        size={40}
                        src={logo}
                    >
                    </Avatar>
                    <Title className="login-header-title">Fun Chat</Title>
                </div>
                <div className="login-body">
                    <Button
                        className="login-body-btn login-body-btn-gg"
                        onClick={handleLoginGg}
                    >
                        <Avatar className="login-body-btn-img"
                            size={30}
                            src={gglogo}
                        >
                        </Avatar>
                        Đăng Nhập Với Google
                    </Button>
                    <Button
                        className="login-body-btn login-body-btn-fb "
                        onClick={handleLoginFb}
                    >
                        <Avatar className="login-body-btn-img"
                            size={40}
                            src={fblogo}
                        >
                        </Avatar>
                        Đăng Nhập Với Facebook
                    </Button>
                </div>
            </div>
        </div >

    );
}

export default Login;