import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import ChooseNick from './ChooseNick';
import apiClient from './apiClient';
import './App.css';

const App = () => {
  const [nickname, setNickname] = useState('');
  const [roomName, setRoomName] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (window.location.pathname.length > 1) {
      setRoomName(window.location.pathname.substring(1));
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (roomName && !connected && nickname) {
      setConnected(true);
      apiClient.watch(roomName, nickname, (payload) => {
        console.log(payload);
      });
    }
  }, [roomName, nickname]);

  return (
    <div className="App">
      <h1>{roomName ? `Chat - ${roomName}` : 'Entre em uma sala'}</h1>
      <ChooseNick nickname={nickname} setNickname={setNickname} roomName={roomName} />
      <ChatBox nickname={nickname} roomName={roomName} />
    </div>
  );
};

export default App;
