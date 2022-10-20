import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import ChooseNick from './ChooseNick';
import apiClient from './apiClient';
import './App.css';

const App = () => {
  const [nickname, setNickname] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (window.location.pathname.length > 1) {
      setRoomName(window.location.pathname.substring(1));
    }
  }, [window.location.pathname]);

  return (
    <div className="App">
      <h1>{roomName ? `Chat - ${roomName}` : 'Entre em uma sala'}</h1>
      <ChooseNick nickname={nickname} setNickname={setNickname} roomName={roomName} />
      <ChatBox nickname={nickname} roomName={roomName} />
    </div>
  );
};

export default App;
