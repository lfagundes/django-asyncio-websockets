import { useState } from 'react';
import apiClient from './apiClient';

interface ChooseNickProps {
  joined: boolean;
  setJoined: Function;
  roomName: string;
}

const ChooseNick = (props: ChooseNickProps) => {
  const [nickname, setNickname] = useState('');

  const handleChangeNickname = (evt: any) => {
    setNickname(evt.target.value);
  };

  const handleSubmitNickname = (evt: any) => {
    apiClient.join(props.roomName, nickname).then(() => {
      props.setJoined(true);
    });

    evt.preventDefault();
  };

  return !props.joined ? <div className='UserChoose'>
    <form onSubmit={handleSubmitNickname}>
      <label htmlFor='nickname'>Nickname:</label>
      <input id='nickname' type="text" value={nickname} onChange={handleChangeNickname} />
      <input type="submit" value="Enviar" />
    </form>
  </div> : <></>;
};

export default ChooseNick;
