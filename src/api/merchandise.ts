import axios from "axios"

class Merchandise {
    root: string = "http://localhost:3000/api/merchandise"
    itemId: string 
    constructor(itemId: string) {
        this.itemId = itemId
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
            let result = await axios.get(`${this.root}/get-admin/${this.itemId}`,{headers})
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
            let result = await axios.put(`${this.root}/update-info/${this.itemId}`,updateField,{headers})
            return result

        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.itemId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async paginate(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-paginate`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }
}

export default Merchandise