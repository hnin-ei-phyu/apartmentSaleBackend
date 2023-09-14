import axios from "axios"

class Seller {
    root: string = "http://localhost:3000/api/seller"
    sellerId: string 
    constructor(sellerId: string) {
        this.sellerId = sellerId
    }

    async loginSeller(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/login-seller`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async verifyBuyerOtpAndCreate(documents: Object,token: any = false) {
        let headers : any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.post(`${this.root}/login-seller/verifySellerOtp`,documents,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async getSeller(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-admin/${this.sellerId}`,{headers})
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
            let result = await axios.put(`${this.root}/update-info/${this.sellerId}`,updateField,{headers})
            return result

        } catch (error) {
            throw error
        }
    }

    async updatePassword(updateField: Object,token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.put(`${this.root}/update-password/${this.sellerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteBuyer(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.sellerId}`,{headers})
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

export default Seller