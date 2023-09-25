import axios from "axios"

class Admin {
    root: string = "http://localhost:3000/api/admin"
    adminId: string 
    constructor(adminId: string) {
        this.adminId = adminId
    }

    async registerAdmin(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/register-admin`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async loginAdmin(token: any = false) {
        let headers : any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.post(`${this.root}/login-admin`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async getAdmin(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-admin/${this.adminId}`,{headers})
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
            let result = await axios.put(`${this.root}/update-info/${this.adminId}`,updateField,{headers})
            return result

        } catch (error) {
            throw error
        }
    }

    async updatePassword(updateField: Object,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.put(`${this.root}/update-password/${this.adminId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteAdmin(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.adminId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async totalCount(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/total-admin`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async getWithRange(range:any,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.post(`${this.root}/getWithRange`,range,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async search(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/search`,{headers})
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

export default Admin