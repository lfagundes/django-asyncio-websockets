const API_URL = 'http://localhost:8000'

const getMessages = (roomName: string): Promise<Response> => {
    return fetch(`${API_URL}/${roomName}/messages`, { method: 'POST' })
}

const join = (roomName: string): Promise<Response> => {
    return fetch(`${API_URL}/${roomName}/join`, { method: 'POST' })
}

const sendMessage = (message: string, roomName: string): Promise<Response> => {
    return fetch(`${API_URL}/${roomName}/send`, { method: 'POST', body: JSON.stringify({ message }) })
}

export default { getMessages, join, sendMessage }