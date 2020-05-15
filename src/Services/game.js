import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/game'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

const startNewGame = async id => {
    const body = {}
    const res = await axios.post(`${baseUrl}/newgame/${id}`, body, config)
    return res.data
}

const getQuestion = async id => {
    const res = await axios.get(`${baseUrl}/getQuestion/${id}`, config)
    return res.data
}

const answerQuestion = async (id, answer) => {
    const body = { answer: answer }
    const res = await axios.post(`${baseUrl}/answer/${id}`, body, config)
    return res.data
}

export default { startNewGame, getQuestion, answerQuestion, setToken }