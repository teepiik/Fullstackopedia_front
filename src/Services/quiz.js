import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/questions'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getOne = async id => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

export default { getAll, getOne }