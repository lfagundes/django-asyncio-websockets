const API_URL = '/api';

const join = (roomName: string, nickName: string): Promise<Response> => {
  return fetch(`${API_URL}/join/${roomName}/${nickName}`, { method: 'POST' })
};

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


export default { join, sendMessage, getMessages };
