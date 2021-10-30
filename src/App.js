import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AppProvider from './components/Context/AppProvider';
import AuthProvider from './components/Context/AuthProvider';
import Login from './components/Login/Login'
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMenberModal from './components/Modal/InviteMenberModal';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider >
            <Switch>
              <Route component={Login} path='/login' />
              <Route component={ChatRoom} path='/' />
            </Switch>
            <AddRoomModal />
            <InviteMenberModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter >
    </div >
  );
}

export default App;
