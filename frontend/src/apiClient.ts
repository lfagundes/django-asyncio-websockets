const API_URL = '/api';

const join = (roomName: string, nickName: string): Promise<Response> => {
  return fetch(`${API_URL}/join/${roomName}/${nickName}`, { method: 'POST' })
};

const leave = (roomName: string, nickName: string): Promise<Response> => {
  return fetch(`${API_URL}/leave/${roomName}/${nickName}`, { method: 'POST' })
};

const sendMessage = (roomName: string, nickName: string, message: string): Promise<Response> => {
  return fetch(`${API_URL}/send/${roomName}/${nickName}`, {
    method: 'POST',
    body: JSON.stringify({ message })
  })
};

const getMessages = (roomName: string): Promise<Response> => {
  return fetch(`${API_URL}/messages/${roomName}`, { method: 'GET' })
};


export default { join, leave, sendMessage, getMessages };
