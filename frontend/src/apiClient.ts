const API_URL = '/api';
const WS_URL = 'ws://localhost:8000/ws';

const sendMessage = (roomName: string, nickName: string, message: string): Promise<Response> => {
  return fetch(`${API_URL}/send/${roomName}/${nickName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  })
};

const getMessages = (roomName: string, nickName: string): Promise<Response> => {
  return fetch(`${API_URL}/messages/${roomName}/${nickName}`, { method: 'GET' })
};

export const watch = (
  roomName: string,
  nickName: string,
  callback: (payload: any) => void,
) => {
  const ws = new WebSocket(`${WS_URL}/chat/${roomName}/${nickName}`);

  ws.onopen = () => {
    console.log('connected');
  };

  ws.onclose = (connection) => {
    console.log('closed');
  };

  ws.onerror = (connection) => {
    console.log('error', connection);
  };

  ws.onmessage = callback;

};

export default { sendMessage, getMessages, watch };
