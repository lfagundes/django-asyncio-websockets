import { useState } from 'react';
import apiClient from './apiClient';

interface ChooseNickProps {
  nickname: string;
  setNickname: Function;
  roomName: string;
}

const ChooseNick = (props: ChooseNickProps) => {
  const handleSubmitNickname = (evt: any) => {
    const n = evt.target[0].value;
    apiClient.join(props.roomName, n).then(() => {
      props.setNickname(n);
    });

    evt.preventDefault();
  };

  return (typeof props.nickname != 'undefined' && props.nickname.length <= 0) ? <div className='UserChoose'>
    <form onSubmit={handleSubmitNickname}>
      <label htmlFor='nickname'>Nickname:</label>
      <input id='nickname' type="text" />
      <input type="submit" value="Enviar" />
    </form>
  </div> : <></>;
};

export default ChooseNick;
