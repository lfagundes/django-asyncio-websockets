import { useState, useEffect } from 'react';
import apiClient from './apiClient';

interface Message {
  user: string;
  message: string;
}

interface ChatBoxProps {
  nickname: string
  roomName: string
}

interface User {
  nick: string;
}

interface Message {
  user: User;
  message: string;
}

const ChatBox = (props: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const handleChangeNewMessage = (evt: any) => {
    setNewMessage(evt.target.value);
  };

  const handleSubmitNewMessage = (evt: any) => {
    apiClient.sendMessage(props.roomName, props.nickname, newMessage).then(() => {
      setNewMessage('');
    });
    evt.preventDefault();
  };

  useEffect(() => {
    if (props.roomName && !connected && props.nickname) {
      const ws = apiClient.watch(props.roomName, props.nickname, (payload) => {
        debugger;
        // SET FUNCTION TO LOAD PREVEOULY MESSAGE
      });

      setConnected(true);
      setWebSocket(ws);
    }
  }, [props.roomName, props.nickname]);

  useEffect(() => {
    const handleNewMessage = (payload: { data: string }) => {
      const message = JSON.parse(payload.data) as Message;
      setMessages([...messages, message]);
    };

    if (connected && webSocket) {
      webSocket.onmessage = handleNewMessage;
    }
  }, [messages, connected, webSocket]);

  return (typeof props.nickname != 'undefined' && props.nickname.length > 0) ? <div className='ChatBox'>
    <ul className='ListMessages'>
      {!!messages && messages.map((v) => {
        return (<li>
          <span className='UserNick'>{v.user}: </span>
          <span className='MessageText'>{v.message}</span>
        </li>);
      })}
    </ul>
    <form onSubmit={handleSubmitNewMessage}>
      <label htmlFor='newMessage'>{props.nickname}: </label>
      <input id='newMessage' type="text" value={newMessage} onChange={handleChangeNewMessage} />
      <input type="submit" value="Enviar" />
    </form>
  </div > : <></>;
};

export default ChatBox;
