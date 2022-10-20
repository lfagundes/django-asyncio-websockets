import { useState } from 'react';
import apiClient from './apiClient';

interface ChooseNickProps {
  nickname: string;
  setNickname: Function;
  roomName: string;
}

const ChooseNick = (props: ChooseNickProps) => {
  const handleSubmitNickname = (evt: any) => {
    evt.preventDefault();
    const n = evt.target[0].value;
    props.setNickname(n);
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
