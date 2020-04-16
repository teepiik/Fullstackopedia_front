import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/gamequestions'

let config = null

const setToken = newToken => {
    config = { headers: { Authorization: `bearer ${newToken}` } }
}

// for dev purposes
const getAll = async () => {
    const res = await axios.get(`${baseUrl}`)
    return res.data
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const destroy = id => {
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default { getAll, create, update, destroy, setToken }