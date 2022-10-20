import { useState } from 'react';
import apiClient from './apiClient';

interface Message {
  user: string;
  message: string;
}

interface ChatBoxProps {
  joined: boolean
  messages: Message[]
  roomName: string
}

const ChatBox = (props: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleChangeNewMessage = (evt: any) => {
    setNewMessage(evt.target.value);
  };

  const handleSubmitNewMessage = (evt: any) => {
    apiClient.sendMessage(newMessage, props.roomName).then(() => {
      setNewMessage('');
    });
    evt.preventDefault();
  };

  return props.joined ? <div className='ChatBox'>
    <ul className='ListMessages'>
      {!!props.messages && props.messages.map((v) => {
        return (<li>
          <span className='UserNick'>{v.user}: </span>
          <span className='MessageText'>{v.message}</span>
        </li>);
      })}
    </ul>
    <form onSubmit={handleSubmitNewMessage}>
      <label htmlFor='newMessage'>Texto: </label>
      <input id='newMessage' type="text" value={newMessage} onChange={handleChangeNewMessage} />
      <input type="submit" value="Enviar" />
    </form>
  </div > : <></>;
};

export default ChatBox;
