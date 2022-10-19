import { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import ChooseNick from './ChooseNick'
import apiClient from './apiClient'
import './App.css'

const App = () => {
  const [joined, setJoined] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([{ user: '', message: '' }])

  useEffect(() => {
    if (window.location.pathname.length > 1) {
      setRoomName(window.location.pathname.substring(1))
    }
  }, [window.location.pathname])

  if (joined) {
    setInterval(() => {
      apiClient.getMessages(roomName).then(async (r: Response) => {
        const m = await r.json()
        setMessages(m)
      });
    }, 1000);
  }

  return (
    <div className="App">
      <h1>{roomName ? `Chat - ${roomName}` : 'Entre em uma sala'}</h1>
      <ChooseNick joined={joined} setJoined={setJoined} roomName={roomName} />
      <ChatBox joined={joined} messages={messages} roomName={roomName} />
    </div>
  )
}

export default App
