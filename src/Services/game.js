import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/game'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

// for dev purposes
const getAll = async () => {
    const res = await axios.get(`${baseUrl}`)
    return res.data
}

const createQuestion = newObject => {
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const updateQuestion = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const deleteQuestion = id => {
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { getAll, createQuestion, updateQuestion, deleteQuestion, setToken }