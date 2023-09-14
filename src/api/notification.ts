import axios from "axios"

class Notification {
    root: string = "http://localhost:3000/api/merchandise"
    notiId: string 
    constructor(notiId: string) {
        this.notiId = notiId
    }

    async create(documents: Object,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.post(`${this.root}/create-merchandise`,documents,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async get(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-admin/${this.notiId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async getAll(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-all`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async update(updateField: Object,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.put(`${this.root}/update-info/${this.notiId}`,updateField,{headers})
            return result

        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.notiId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async totalCount(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/total-noti`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }
}

export default Notification