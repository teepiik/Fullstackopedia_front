import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/questions'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getOne = async id => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const create = async newObject => {
    const res = axios.post(baseUrl, newObject, config)
    return res.data
}

const update = async (id, newObject) => {
    const res = axios.put(`${baseUrl}/${id}`, newObject, config)
    return res.data
}

const destroy = id => {
    const res = axios.delete(`${baseUrl}/${id}`, config)
    return res.data
}

export default { getAll, getOne, create, update, destroy, setToken }