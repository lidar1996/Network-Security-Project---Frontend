import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5500/ctdl/"
})

export default instance;