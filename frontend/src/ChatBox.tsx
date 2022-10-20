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

const ChatBox = (props: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([{ user: { nick: '' }, message: '' }]);

  useEffect(() => {
    if (props.nickname) {
      setInterval(() => {
        apiClient.getMessages(props.roomName, props.nickname).then(async (r: Response) => {
          const m = await r.json();
          setMessages(m);
        });
      }, 1000);
    }
  }, [props.nickname]);

  const handleChangeNewMessage = (evt: any) => {
    setNewMessage(evt.target.value);
  };

  const handleSubmitNewMessage = (evt: any) => {
    apiClient.sendMessage(props.roomName, props.nickname, newMessage).then(() => {
      setNewMessage('');
    });
    evt.preventDefault();
  };

  return (typeof props.nickname != 'undefined' && props.nickname.length > 0) ? <div className='ChatBox'>
    <ul className='ListMessages'>
      {!!messages && messages.map((v) => {
        return (<li>
          <span className='UserNick'>{v.user.nick}: </span>
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
