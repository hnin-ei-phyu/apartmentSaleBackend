import axios from "axios"

class Buyer {
    root: string = "http://localhost:3000/api/buyer"
    buyerId: string 
    constructor(buyerId: string) {
        this.buyerId = buyerId
    }

    async loginBuyer(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/login-buyer`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async verifyBuyerOtpAndCreate(documents: Object,token: any = false) {
        let headers : any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.post(`${this.root}/login-buyer/verifyBuyerOtp`,documents,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async getBuyer(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-admin/${this.buyerId}`,{headers})
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
            let result = await axios.put(`${this.root}/update-info/${this.buyerId}`,updateField,{headers})
            return result

        } catch (error) {
            throw error
        }
    }

    async updatePassword(updateField: Object,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.put(`${this.root}/update-password/${this.buyerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteBuyer(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.buyerId}`,{headers})
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

export default Buyer