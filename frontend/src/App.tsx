import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [joined, setJoined] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [nickname, setNickname] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (window.location.pathname.length > 1) {
      setRoomName(window.location.pathname.substring(1))
    }
  }, [window.location.pathname])

  const handleChangeNickname = (evt) => {
    setNickname(evt.target.value)
  }

  const handleSubmitNickname = (evt) => {
    setJoined(true);
    evt.preventDefault();
  }
  const handleChangeNewMessage = (evt) => {
    setNewMessage(evt.target.value)
  }

  const handleSubmitNewMessage = (evt) => {
    const m = messages.concat({ user: nickname, message: newMessage });
    setMessages(m)
    setNewMessage('');
    console.log(roomName)
    evt.preventDefault();
  }

  return (
    <div className="App">
      <h1>{roomName ? `Chat - ${roomName}` : 'Entre em uma sala'}</h1>
      {!joined ?
        (<div className='UserChoose'>
          <form onSubmit={handleSubmitNickname}>
            <label htmlFor='nickname'>Nickname:</label>
            <input id='nickname' type="text" value={nickname} onChange={handleChangeNickname} />
            <input type="submit" value="Enviar" />
          </form>
        </div>) : ''}
      {joined ? (<div className='ChatBox'>
        <ul className='ListMessages'>
          {!!messages && messages.map((v) => {
            return (<li>
              <span className='UserNick'>{v.user}: </span>
              <span className='MessageText'>{v.message}</span>
            </li>)
          })}
        </ul>
        <form onSubmit={handleSubmitNewMessage}>
          <label htmlFor='newMessage'>Texto: </label>
          <input id='newMessage' type="text" value={newMessage} onChange={handleChangeNewMessage} />
          <input type="submit" value="Enviar" />
        </form>
      </div>) : ''}
    </div>
  )
}

export default App
