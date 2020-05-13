import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/game'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

const startNewGame = id => {

}

const getQuestion = id => {

}

const answerQuestion = (id, answer) => {

}

export default { startNewGame, getQuestion, answerQuestion, setToken }